import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { GrGoogle } from 'react-icons/gr';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { logIn } from './config';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account ' });

function SignIn() {
  const navigate = useNavigate();

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(logIn, provider);
      const token = await result.user.getIdToken();

      // Enviar el token al backend
      fetch('http://localhost:9090/api/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });

      navigate(`/profile/${result.user.uid}`);
    } catch (error) {
      console.error(error);
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
