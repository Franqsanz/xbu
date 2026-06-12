import { useCallback, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

import { logIn } from '@services/auth/config';
import { postLogin } from '@services/api';
import { useToast } from '@chakra-ui/react';
import { keys } from '@utils/utils';

interface FirebaseLoginError {
  type: 'firebase' | 'backend' | 'network' | 'timeout' | 'cancelled' | 'unknown';
  message: string;
  originalError?: Error;
}

type LoginResult =
  | { success: true; error?: undefined }
  | { success: false; error: FirebaseLoginError };

const POPUP_TIMEOUT_MS = 60_000;

export function useFirebaseLogin() {
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const getErrorMessage = (err: FirebaseLoginError): string => {
    const messages: Record<FirebaseLoginError['type'], string> = {
      firebase: 'Error de autenticación con Google. Intentá de nuevo.',
      backend: 'No se pudo conectar con el servidor. Intentá de nuevo.',
      network: 'Sin conexión a internet. Verificá tu conexión.',
      timeout: 'La conexión tardó demasiado. Intentá de nuevo.',
      cancelled: 'Cerraste el inicio de sesión antes de completarlo.',
      unknown: 'Error al iniciar sesión. Intentá de nuevo.',
    };
    return messages[err.type] || err.message;
  };

  const showError = useCallback(
    (err: FirebaseLoginError) => {
      const message = getErrorMessage(err);
      const isCancelled = err.type === 'cancelled';
      toast({
        title: isCancelled ? 'Inicio cancelado' : 'Error de autenticación',
        description: message,
        status: isCancelled ? 'info' : 'error',
        duration: 4000,
        isClosable: true,
      });
    },
    [toast],
  );

  const login = useCallback(async (): Promise<LoginResult> => {
    setIsPending(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // Step 1: signInWithPopup con timeout de seguridad
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

      // Step 2: idToken
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

      // Step 3: postLogin al backend
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

      // Step 4: verificar respuesta
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

      // Step 5: invalidar la query de userData para forzar refetch con cookies ya seteadas.
      // Esto evita la race condition en la que el AuthContext intentaba pegarle a
      // /users/me antes de que postLogin terminara de crear la session cookie.
      const firebaseUser = logIn.currentUser;
      if (firebaseUser) {
        await queryClient.invalidateQueries({
          queryKey: [keys.userData, firebaseUser.uid],
        });
      }

      return { success: true };
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
      setIsPending(false);
    }
  }, []);

  return {
    isPending,
    login,
    showError,
  };
}
