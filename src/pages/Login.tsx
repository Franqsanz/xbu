import React from 'react';
import { Box, Flex, Button, Stack } from '@chakra-ui/react';
import { BsFacebook, BsTwitterX } from 'react-icons/bs';

import { ContainerTitle } from '@components/ContainerTitle';
import { MainHead } from '@components/Head';
import { SignIn } from '@services/auth/auth';

export function Login() {
  return (
    <>
      <MainHead title='Ingresar o Regístrate | XBuniverse' />
      <ContainerTitle title='Ingresar o Regístrate' />
      <Flex
        justify='center'
        // py={{ base: '10vh', md: '31vh' }}
        py='10'
      >
        <Stack
          // maxW='400px'
          w={{ base: 'auto', md: '400px' }}
          h='300px'
          direction='column'
          justify='center'
          align='center'
          spacing='3'
          borderRadius='xl'
          border={{ base: 0, md: '1px solid #A0AEC0' }}
        >
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
