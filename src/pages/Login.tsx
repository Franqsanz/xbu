import React from 'react';
import { Box, Flex, Button, Stack } from '@chakra-ui/react';
import { BsFacebook, BsTwitterX } from 'react-icons/bs';

import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';
import { SignIn } from '../services/firebase/auth';

export function Login() {
  return (
    <>
      <MainHead title='Ingresar | XBuniverse' />
      <ContainerTitle title='Ingresar' />
      <Flex justify='center' py={{ base: '10vh', md: '31vh' }}>
        <Stack direction='column' spacing='3'>
          <SignIn />
          {/* <Button
            fontWeight='normal'
            leftIcon={<BsTwitterX />}
            color='white'
            bg='black'
            border='1px'
            borderRadius='lg'
            p='7'
            fontSize='xl'
            _hover={{ bg: '#242424' }}
            _active={{ bg: 'black' }}
          >
            Continuar con X
          </Button>
           <Button
            fontWeight='normal'
            leftIcon={<BsFacebook />}
            colorScheme='facebook'
            border='1px'
            borderRadius='lg'
            p='7'
            fontSize='xl'
          >
            Facebook
          </Button> */}
        </Stack>
      </Flex>
    </>
  );
}
