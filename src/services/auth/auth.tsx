import React, { useState, useEffect } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { logIn } from './config';
import { useCheckUser } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useAccountActions } from '@hooks/useAccountActions';
import { postLogin } from '@services/api';

export function SignIn() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { logOut } = useAccountActions();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { data, isPending, refetch } = useCheckUser();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  async function SignInWithGoogle() {
    try {
      setIsAuthenticating(true);
      const result = await signInWithPopup(logIn, provider);

      if (result) {
        const idToken = await result.user.getIdToken(true);
        const loginResponse = await postLogin(idToken);

        // Verifica que el login fue exitoso antes de continuar
        if (loginResponse?.auth === true) {
          await refetch();
        } else {
          setIsAuthenticating(false);
          await DisconnectFirebaseAccount();
        }
      }
    } catch (error) {
      setIsAuthenticating(false);
      await DisconnectFirebaseAccount();
    }
  }

  useEffect(() => {
    if (!isPending && data) {
      if (data.uid === null || !data.username) {
        navigate('/create-username', {
          state: { userId: currentUser?.uid },
        });
      } else if (data.username) {
        setIsAuthenticating(false);
        window.location.href = `/profile/${data.username}`;
      }
    }
  }, [data, isPending, navigate, currentUser]);

  async function DisconnectFirebaseAccount() {
    try {
      await logOut();
    } catch (error) {
      // silent fail
    }
  }

  return (
    <>
      <Button
        w='full'
        h='48px'
        fontWeight='500'
        fontSize='md'
        leftIcon={<FcGoogle size='24px' />}
        bg={useColorModeValue('#ffffff', '#1F2937')}
        color={useColorModeValue('#202124', '#E5E7EB')}
        border='1px solid'
        borderColor={useColorModeValue('#E0E0E0', '#404854')}
        borderRadius='8px'
        transition='all 0.2s ease'
        boxShadow={useColorModeValue(
          '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
          '0 1px 2px rgba(0,0,0,0.3)',
        )}
        _hover={{
          bg: useColorModeValue('#F8F9FA', '#2D3748'),
          boxShadow: useColorModeValue(
            '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.25)',
            '0 1px 3px rgba(0,0,0,0.4)',
          ),
          transform: 'translateY(-1px)',
        }}
        _active={{
          transform: 'translateY(0)',
          boxShadow: useColorModeValue(
            '0 1px 2px 0 rgba(60,64,67,0.2)',
            '0 1px 2px rgba(0,0,0,0.2)',
          ),
        }}
        onClick={SignInWithGoogle}
        loadingText='Redirigiendo...'
        isLoading={isAuthenticating}
      >
        Continuar con Google
      </Button>
    </>
  );
}
