import React, { useEffect } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@contexts/AuthContext';
import { useFirebaseLogin } from '@hooks/useFirebaseLogin';

export function SignIn() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const { isPending, login, showErrorToast } = useFirebaseLogin();

  async function handleSignInClick() {
    const success = await login();
    if (!success) {
      showErrorToast();
    }
    // Si success = true, AuthContext se encarga del resto automáticamente
  }

  // Redirigir cuando el usuario está logueado y tiene datos
  useEffect(() => {
    if (currentUser && userData) {
      // Usuario logueado y datos cargados
      if (!userData.username) {
        // No tiene username, ir a crear uno
        navigate('/create-username', {
          state: { userId: currentUser.uid },
        });
      } else {
        // Tiene username, ir al perfil
        window.location.href = `/profile/${userData.username}`;
      }
    }
  }, [currentUser, userData, navigate]);

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
        onClick={handleSignInClick}
        loadingText='Redirigiendo...'
        isLoading={isPending}
        isDisabled={isPending}
      >
        Continuar con Google
      </Button>
    </>
  );
}
