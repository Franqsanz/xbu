import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { GrGoogle } from 'react-icons/gr';
import {
  GoogleAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
  // getRedirectResult,
  signOut,
} from 'firebase/auth';

import { logIn } from './config';
import { API_URL } from '../../config';
// import { useUserRegister } from '../../hooks/querys';
// import { useAuth } from '../../store/AuthContext';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account ' });

function SignIn() {
  const navigate = useNavigate();
  // const { mutate } = useUserRegister(token);

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(logIn, provider);
      const token = await result.user.getIdToken();
      // await signInWithRedirect(logIn, provider);

      // Obtener el resultado de la redirección
      // const result = await getRedirectResult(logIn);

      // mutate(token);
      const serverResponse = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });

      if (serverResponse.ok) {
        // El registro en el servidor fue exitoso, navegar a la página de perfil
        navigate(`/profile/${result.user.uid}`);
      } else {
        console.error('Error en el servidor:', serverResponse.statusText);
        await DisconnectFirebaseAccount();
      }
    } catch (error) {
      await DisconnectFirebaseAccount();
      console.warn(error);
    }
  }

  async function DisconnectFirebaseAccount() {
    // const { currentUser } = useAuth();

    try {
      await logOut();
      // await currentUser?.delete(); // Elimina la cuenta de Firebase
    } catch (firebaseError) {
      console.error(
        'Error al desconectar la cuenta de Firebase:',
        firebaseError,
      );
    }
  }

  return (
    <>
      <Button
        w='250px'
        fontWeight='normal'
        leftIcon={<GrGoogle />}
        bg={useColorModeValue('#EA4335', '#EE685D')}
        color={useColorModeValue('white', 'black')}
        borderRadius='lg'
        p='7'
        fontSize='xl'
        _hover={{ bg: '#D23C2F' }}
        _active={{ bg: '#BB352A' }}
        onClick={signInWithGoogle}
      >
        Google
      </Button>
    </>
  );
}

// async function login() {
//   try {
//     const result = await signInWithPopup(logIn, provider);
//     const token = await result.user.getIdToken();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function logOut() {
  try {
    await signOut(logIn);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}

export { SignIn, logOut };
