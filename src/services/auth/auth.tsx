import React, { useState, useEffect } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GrGoogle } from 'react-icons/gr';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import Cookies from 'js-cookie';

import { logIn } from './config';
import { useCheckUser } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useAccountActions } from '@hooks/useAccountActions';

export function SignIn() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { logOut } = useAccountActions();
  const [userId, setUserId] = useState('');
  const { data, isPending, error, refetch } = useCheckUser(userId);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  async function SignInWithGoogle() {
    try {
      const result = await signInWithPopup(logIn, provider);

      if (result) {
        const token = await result.user.getIdToken(true);
        await window.localStorage.setItem('app_tk', token);
        // Cookies.set('app_tk', token);
        // document.cookie = `app_tk=${token}; SameSite=None; path=/;`;
      }
    } catch (error) {
      await DisconnectFirebaseAccount();
      console.warn(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      function checkUserData() {
        setUserId(currentUser?.uid as string);
      }
      checkUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  useEffect(() => {
    if (!isPending && (!data || data.uid === null)) {
      return navigate('/create-username', {
        state: { token: window.localStorage.getItem('app_tk') },
      });
    }

    if (data && data.username) {
      return navigate(`/${data.username}`);
    }
  }, [data, isPending, error]);

  async function DisconnectFirebaseAccount() {
    // const { currentUser } = useAuth();

    try {
      await logOut();
      // await currentUser?.delete(); // Elimina la cuenta de Firebase
    } catch (error) {
      console.error('Error al desconectar la cuenta de Firebase:', error);
    }
  }

  return (
    <>
      <Button
        fontWeight='normal'
        leftIcon={<GrGoogle size='20px' />}
        bg={useColorModeValue('#EA4335', '#EE685D')}
        color={useColorModeValue('white', 'black')}
        borderRadius='lg'
        p='6'
        fontSize='md'
        _hover={{ bg: '#D23C2F' }}
        _active={{ bg: '#BB352A' }}
        onClick={SignInWithGoogle}
        loadingText='Redirigiendo...'
        isLoading={!isPending}
      >
        Continuar con Google
      </Button>
    </>
  );
}
