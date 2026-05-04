import { useCallback, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

import { logIn } from '@services/auth/config';
import { postLogin } from '@services/api';
import { useToast } from '@chakra-ui/react';

interface FirebaseLoginError {
  type: 'firebase' | 'backend' | 'network' | 'timeout' | 'unknown';
  message: string;
  originalError?: Error;
}

export function useFirebaseLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<FirebaseLoginError | null>(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  const getErrorMessage = (err: FirebaseLoginError): string => {
    const messages: Record<string, string> = {
      firebase: 'Error de autenticación con Google. Intenta de nuevo.',
      backend: 'No se pudo conectar con el servidor. Intenta de nuevo.',
      network: 'Sin conexión a internet. Verifica tu conexión.',
      timeout: 'La conexión tardó demasiado. Intenta de nuevo.',
      unknown: 'Error al iniciar sesión. Intenta de nuevo.',
    };
    return messages[err.type] || err.message;
  };

  const login = useCallback(async (): Promise<boolean> => {
    setIsPending(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // Step 1: Obtener idToken de Firebase
      let firebaseResult;
      try {
        firebaseResult = await signInWithPopup(logIn, provider);
      } catch (err: any) {
        setError({
          type: 'firebase',
          message: err.message || 'Error de autenticación con Google',
          originalError: err,
        });
        setIsPending(false);
        return false;
      }

      if (!firebaseResult) {
        setError({
          type: 'unknown',
          message: 'No se obtuvo token de Firebase',
        });
        setIsPending(false);
        return false;
      }

      // Step 2: Obtener idToken
      let idToken: string;
      try {
        idToken = await firebaseResult.user.getIdToken(true);
      } catch (err: any) {
        // Si no podemos obtener el token, desloguear de Firebase
        await signOut(logIn);
        setError({
          type: 'firebase',
          message: 'No se pudo obtener el token de autenticación',
          originalError: err,
        });
        setIsPending(false);
        return false;
      }

      // Step 3: Validar idToken con el backend (Backend-first)
      let loginResponse;
      try {
        loginResponse = await Promise.race([
          postLogin(idToken),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 5000),
          ),
        ]);
      } catch (err: any) {
        // Si el backend falla, desloguear de Firebase
        await signOut(logIn);

        if (err.message === 'timeout') {
          setError({
            type: 'timeout',
            message: 'La conexión tardó demasiado. Intenta de nuevo.',
            originalError: err,
          });
        } else if (
          err instanceof TypeError &&
          err.message.includes('Failed to fetch')
        ) {
          setError({
            type: 'network',
            message: 'Sin conexión a internet. Verifica tu conexión.',
            originalError: err,
          });
        } else {
          setError({
            type: 'backend',
            message: err.message || 'No se pudo conectar con el servidor',
            originalError: err,
          });
        }

        setIsPending(false);
        return false;
      }

      // Step 4: Verificar respuesta del backend
      if (!loginResponse?.auth) {
        // Si el backend rechaza el login, desloguear de Firebase
        await signOut(logIn);
        setError({
          type: 'backend',
          message: 'El servidor rechazó la autenticación',
        });
        setIsPending(false);
        return false;
      }

      // Step 5: TODO -> El componente auth.tsx va a hacer refetch()
      // Aquí solo retornamos success

      setIsPending(false);
      return true;
    } catch (err: any) {
      setError({
        type: 'unknown',
        message: 'Error inesperado durante el login',
        originalError: err,
      });
      setIsPending(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setIsPending(false);
  }, []);

  const showErrorToast = useCallback(() => {
    if (error) {
      const message = getErrorMessage(error);
      toast({
        title: 'Error de autenticación',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return {
    isPending,
    error,
    login,
    reset,
    showErrorToast,
  };
}
