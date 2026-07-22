import { useCallback, useState } from 'react';
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

import { logIn } from '@services/auth/config';
import { postLogin } from '@services/api';
import { useToast } from '@chakra-ui/react';
import { keys } from '@utils/utils';

interface FirebaseLoginError {
  type:
    | 'firebase'
    | 'backend'
    | 'network'
    | 'timeout'
    | 'cancelled'
    | 'quota'
    | 'unknown';
  message: string;
  originalError?: Error;
}

type LoginResult =
  | { success: true; error?: undefined }
  | { success: false; error: FirebaseLoginError };

const POPUP_TIMEOUT_MS = 60_000;

export function useFirebaseLogin() {
  const [isPendingGoogle, setIsPendingGoogle] = useState(false);
  const [isPendingSendLink, setIsPendingSendLink] = useState(false);
  const [isPendingComplete, setIsPendingComplete] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const getErrorMessage = (err: FirebaseLoginError): string => {
    if (err.type === 'quota') return err.message;
    const messages: Record<FirebaseLoginError['type'], string> = {
      firebase: 'Error de autenticación. Intentá de nuevo.',
      backend: 'No se pudo conectar con el servidor. Intentá de nuevo.',
      network: 'Sin conexión a internet. Verificá tu conexión.',
      timeout: 'La conexión tardó demasiado. Intentá de nuevo.',
      cancelled: 'Cerraste el inicio de sesión antes de completarlo.',
      quota: err.message,
      unknown: 'Error al iniciar sesión. Intentá de nuevo.',
    };
    return messages[err.type] || err.message;
  };

  const finishLogin = useCallback(
    async (firebaseResult: UserCredential): Promise<LoginResult> => {
      let idToken: string;
      try {
        idToken = await firebaseResult.user.getIdToken(true);
      } catch (err: any) {
        await signOut(logIn).catch(() => {});
        return {
          success: false,
          error: {
            type: 'firebase',
            message: 'No se pudo obtener el token de autenticación',
            originalError: err,
          },
        };
      }

      let loginResponse: any;
      try {
        loginResponse = await Promise.race([
          postLogin(idToken),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 5000),
          ),
        ]);
      } catch (err: any) {
        await signOut(logIn).catch(() => {});
        if (err.message === 'timeout') {
          return {
            success: false,
            error: { type: 'timeout', message: 'La conexión tardó demasiado.' },
          };
        }
        if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
          return {
            success: false,
            error: { type: 'network', message: 'Sin conexión a internet.' },
          };
        }
        return {
          success: false,
          error: {
            type: 'backend',
            message: err?.message || 'No se pudo conectar con el servidor',
            originalError: err,
          },
        };
      }

      if (!loginResponse?.auth) {
        await signOut(logIn).catch(() => {});
        return {
          success: false,
          error: {
            type: 'backend',
            message: 'El servidor rechazó la autenticación',
          },
        };
      }

      const firebaseUser = logIn.currentUser;
      if (firebaseUser) {
        await queryClient.invalidateQueries({
          queryKey: [keys.userData, firebaseUser.uid],
        });
      }
      return { success: true };
    },
    [queryClient],
  );

  const showError = useCallback(
    (err: FirebaseLoginError) => {
      const message = getErrorMessage(err);
      let title = 'Error de autenticación';
      let status: 'info' | 'warning' | 'error' = 'error';
      if (err.type === 'cancelled') {
        title = 'Inicio cancelado';
        status = 'info';
      } else if (err.type === 'quota') {
        title = 'Límite alcanzado';
        status = 'warning';
      }
      toast({
        title,
        description: message,
        status,
        duration: 4000,
        isClosable: true,
      });
    },
    [toast],
  );

  const login = useCallback(async (): Promise<LoginResult> => {
    setIsPendingGoogle(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      let firebaseResult;
      try {
        firebaseResult = await Promise.race([
          signInWithPopup(logIn, provider),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('popup-timeout')), POPUP_TIMEOUT_MS),
          ),
        ]);
      } catch (err: any) {
        const code = err?.code as string | undefined;
        const isCancelled =
          code === 'auth/popup-closed-by-user' ||
          code === 'auth/cancelled-popup-request' ||
          code === 'auth/user-cancelled';
        const isBlocked = code === 'auth/popup-blocked';
        const isTimeout = err?.message === 'popup-timeout';

        return {
          success: false,
          error: {
            type: isCancelled ? 'cancelled' : isTimeout ? 'timeout' : 'firebase',
            message: isBlocked
              ? 'El popup de Google fue bloqueado. Habilitá popups y volvé a intentar.'
              : err?.message || 'Error de autenticación con Google',
            originalError: err,
          },
        };
      }

      if (!firebaseResult) {
        return {
          success: false,
          error: { type: 'unknown', message: 'No se obtuvo token de Firebase' },
        };
      }

      return await finishLogin(firebaseResult);
    } catch (err: any) {
      return {
        success: false,
        error: {
          type: 'unknown',
          message: 'Error inesperado durante el login',
          originalError: err,
        },
      };
    } finally {
      setIsPendingGoogle(false);
    }
  }, [finishLogin]);

  const sendEmailLink = useCallback(async (email: string): Promise<LoginResult> => {
    setIsPendingSendLink(true);
    try {
      const normalized = email.trim().toLowerCase();
      await sendSignInLinkToEmail(logIn, normalized, {
        url: `${window.location.origin}/finish-login`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', normalized);
      return { success: true };
    } catch (err: any) {
      const code = err?.code as string | undefined;
      const raw = `${err?.code ?? ''} ${err?.message ?? ''} ${JSON.stringify(err?.customData ?? {})}`;
      const isQuota =
        code === 'auth/too-many-requests' ||
        /QUOTA_EXCEEDED|quota|too-many-requests/i.test(raw);
      return {
        success: false,
        error: {
          type: isQuota ? 'quota' : 'firebase',
          message: isQuota
            ? 'Alcanzamos el límite diario de envíos. Probá de nuevo mañana o iniciá con Google.'
            : err?.message || 'No se pudo enviar el enlace',
          originalError: err,
        },
      };
    } finally {
      setIsPendingSendLink(false);
    }
  }, []);

  const completeEmailLinkLogin = useCallback(
    async (email: string): Promise<LoginResult> => {
      setIsPendingComplete(true);
      try {
        if (!isSignInWithEmailLink(logIn, window.location.href)) {
          return {
            success: false,
            error: { type: 'unknown', message: 'Enlace inválido o expirado.' },
          };
        }

        const normalized = email.trim().toLowerCase();
        let firebaseResult;
        try {
          firebaseResult = await signInWithEmailLink(
            logIn,
            normalized,
            window.location.href,
          );
        } catch (err: any) {
          const code = err?.code as string | undefined;
          const isInvalidCode =
            code === 'auth/invalid-action-code' ||
            code === 'auth/expired-action-code';
          return {
            success: false,
            error: {
              type: 'firebase',
              message: isInvalidCode
                ? 'El enlace ya fue usado o expiró. Pedí uno nuevo.'
                : err?.message || 'Enlace inválido o expirado.',
              originalError: err,
            },
          };
        }

        const result = await finishLogin(firebaseResult);
        if (result.success) {
          window.localStorage.removeItem('emailForSignIn');
        }
        return result;
      } finally {
        setIsPendingComplete(false);
      }
    },
    [finishLogin],
  );

  return {
    isPendingGoogle,
    isPendingSendLink,
    isPendingComplete,
    login,
    sendEmailLink,
    completeEmailLinkLogin,
    showError,
  };
}
