import React from 'react';
import { Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { GrGoogle, GrTwitter } from 'react-icons/gr';
import { BsFacebook } from 'react-icons/bs';

import { ContainerTitle } from '../components/ContainerTitle';
import { Title } from '../components/Head';

export function Login() {
  return (
    <>
      <Title title='Iniciar Sesión' />
      <ContainerTitle title='Iniciar Sesión' />
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
          >
            Facebook
          </Button>
        </Stack>
      </Flex>
    </>
  );
}
