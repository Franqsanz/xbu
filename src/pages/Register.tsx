import React from 'react';
import { Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { GrGoogle, GrTwitter } from 'react-icons/gr';
import { BsFacebook } from 'react-icons/bs';

import { ContainerTitle } from '../components/ContainerTitle';
import { MainHead } from '../components/Head';

export function Register() {
  return (
    <>
      <MainHead title='Crear cuenta | XBuniverse' />
      <ContainerTitle title='Crear cuenta' showSearch={false} />
      <Flex justify='center' py={{ base: '10vh', md: '15vh' }}>
        <Stack direction='column' spacing='5'>
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
            onClick={() =>
              // window.open('https://xb-api.vercel.app/auth/twitter', '_self')
              window.open('http://localhost:9090/auth/google', '_self')
            }
          >
            Google
          </Button>
          <Button
            fontWeight='normal'
            leftIcon={<GrTwitter />}
            colorScheme='twitter'
            border='1px'
            borderRadius='lg'
            p='7'
            fontSize='xl'
            onClick={
              () =>
                window.open('https://xb-api.vercel.app/auth/twitter', '_self')
              // window.open('http://localhost:9090/auth/twitter', '_self')
            }
          >
            Twitter
          </Button>
          <Button
            fontWeight='normal'
            leftIcon={<BsFacebook />}
            colorScheme='facebook'
            border='1px'
            borderRadius='lg'
            p='7'
            fontSize='xl'
            onClick={
              () =>
                window.open('https://xb-api.vercel.app/auth/facebook', '_self')
              // window.open('http://localhost:9090/auth/facebook', '_self')
            }
          >
            Facebook
          </Button>
        </Stack>
      </Flex>
    </>
  );
}
