import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { GrGoogle } from 'react-icons/gr';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { logIn } from './config';
import { useUserRegister } from '../../hooks/querys';
// import { useAuth } from '../../store/AuthContext';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account ' });

function SignIn() {
  const { mutateAsync, isPending, isError, isSuccess } = useUserRegister();
  let errorUI;

  if (isError) {
    errorUI = <h1>error de conexion</h1>;
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(logIn, provider);
      const token = await result.user.getIdToken();

      return mutateAsync(token);
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
        w='275px'
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
        loadingText='Redirigiendo...'
        isLoading={isPending}
      >
        Continuar con Google
      </Button>
      <div>{errorUI}</div>
    </>
  );
}

async function logOut() {
  try {
    await signOut(logIn);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}

export { SignIn, logOut };
