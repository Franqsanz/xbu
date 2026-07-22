import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { isSignInWithEmailLink } from 'firebase/auth';

import { useAuth } from '@contexts/AuthContext';
import { useFirebaseLogin } from '@hooks/useFirebaseLogin';
import { logIn } from '@services/auth/config';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FinishLogin() {
  const navigate = useNavigate();
  const { completeEmailLinkLogin, showError, isPendingComplete } =
    useFirebaseLogin();
  const { currentUser, userData, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [done, setDone] = useState(false);
  const [linkValid, setLinkValid] = useState<boolean | null>(null);
  const attemptedRef = useRef(false);
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const bgColorButton = useColorModeValue('green.500', 'green.700');

  useEffect(() => {
    if (loading) return;
    if (currentUser) {
      if (userData?.username) {
        navigate('/', { replace: true });
      } else {
        navigate('/create-username', {
          replace: true,
          state: { userId: currentUser.uid },
        });
      }
      return;
    }
    const valid = isSignInWithEmailLink(logIn, window.location.href);
    setLinkValid(valid);
    if (!valid) {
      setError('Enlace inválido o expirado.');
      return;
    }
    const stored = window.localStorage.getItem('emailForSignIn');
    if (!stored) {
      // Sin email guardado no podemos completar el sign-in (Firebase lo
      // requiere y no viene en el URL). Puede ser un link abierto en otro
      // browser/dispositivo o storage limpiado. Redirigimos al home.
      setError('El enlace expiró o se abrió desde otro dispositivo.');
      return;
    }
    setEmail(stored);
    handleContinue(stored);
  }, [currentUser, userData, loading, navigate]);

  useEffect(() => {
    if (!done) return;
    if (!currentUser) return;
    if (loading) return;
    if (userData?.username) {
      navigate('/', { replace: true });
    } else {
      navigate('/create-username', {
        replace: true,
        state: { userId: currentUser.uid },
      });
    }
  }, [done, currentUser, userData, loading, navigate]);

  // Cuando el link es inválido/expirado o el sign-in falló, no dejamos al
  // usuario clavado en la pantalla de error: lo mandamos al home tras unos
  // segundos para que pueda pedir otro enlace.
  useEffect(() => {
    if (!error) return;
    const id = window.setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
    return () => window.clearTimeout(id);
  }, [error, navigate]);

  async function handleContinue(overrideEmail?: string) {
    if (attemptedRef.current) return;
    const trimmed = (overrideEmail ?? email).trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('Ingresá un email válido.');
      return;
    }
    setEmailError('');
    attemptedRef.current = true;
    const result = await completeEmailLinkLogin(trimmed);
    if (!result.success) {
      attemptedRef.current = false;
      showError(result.error);
      setError(result.error.message);
      return;
    }
    setDone(true);
    // Hard-nav para dejar el URL limpio (sin oobCode) y no depender del
    // useEffect, que puede quedar esperando a que el AuthContext termine su
    // refetch de /users/me tras el signIn.
    window.location.replace('/create-username');
  }

  if (linkValid === null) {
    return (
      <Flex direction='column' align='center' justify='center' minH='60vh' gap='4'>
        <Spinner size='lg' />
      </Flex>
    );
  }

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      minH='60vh'
      gap='4'
      px='4'
    >
      {error ? (
        <>
          <Text fontSize='lg' fontWeight='500'>
            No pudimos completar el ingreso
          </Text>
          <Text fontSize='sm' color={subColor} textAlign='center'>
            {error}
          </Text>
          <Text fontSize='xs' color={subColor} textAlign='center'>
            Te vamos a redirigir al inicio…
          </Text>
        </>
      ) : done ? (
        <>
          <Spinner size='lg' />
          <Text fontSize='sm' color={subColor}>
            Redirigiendo…
          </Text>
        </>
      ) : (
        <Flex direction='column' gap='3' w='full' maxW='360px'>
          <Text fontSize='md' fontWeight='500' textAlign='center'>
            Completar ingreso
          </Text>
          <Text fontSize='sm' color={subColor} textAlign='center'>
            Confirmá el email al que te enviamos el enlace y presioná Continuar.
          </Text>
          <Input
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleContinue();
              }
            }}
            placeholder='Email'
            bg={bgColorInput}
            fontSize={{ base: 'md', md: 'sm' }}
            _focus={{ bg: 'transparent' }}
            isDisabled={isPendingComplete}
          />
          {emailError && (
            <Text fontSize='xs' color='red.400'>
              {emailError}
            </Text>
          )}
          <Button
            type='button'
            w='full'
            h='44px'
            fontWeight='500'
            fontSize='sm'
            border='1px'
            bg={bgColorButton}
            color='black'
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.600' }}
            isLoading={isPendingComplete}
            isDisabled={isPendingComplete || !email.trim()}
            loadingText='Ingresando...'
            onClick={() => handleContinue()}
          >
            Continuar
          </Button>
          <Button
            type='button'
            variant='ghost'
            w='full'
            fontWeight='400'
            fontSize='sm'
            onClick={() => navigate('/', { replace: true })}
            isDisabled={isPendingComplete}
          >
            Volver al inicio
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
