import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Text, VStack, Box } from '@chakra-ui/react';

import { MainHead } from '../components/Head';

export function ErrorPage() {
  return (
    <>
      <MainHead title='Page not found' />
      <VStack fontSize='2xl' py='44' h='90vh'>
        <Box as='h1' fontSize='9xl' fontWeight='bold' color='#2de000'>
          404
        </Box>
        <Text pt='1.5' pb='10'>
          ¡Está pagina no existe!
        </Text>
        <Link
          to='/'
          as={NavLink}
          border='1px'
          borderColor='#2de000'
          borderRadius='lg'
          p='3'
          fontSize='xl'
          _hover={{
            outline: 'none',
            bg: '#2de000',
            color: 'black',
            borderColor: 'black',
          }}
        >
          ← Volver al inicio
        </Link>
      </VStack>
    </>
  );
}
