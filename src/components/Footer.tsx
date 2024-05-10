import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';

import { useNetworkState } from '@hooks/useNetworkState';

export function Footer() {
  const bgFooter = useColorModeValue('gray.100', 'gray.900');
  const networkState = useNetworkState();
  let connectionState;

  if (networkState === 'online') {
    connectionState = (
      <Box w='14px' h='14px' rounded='full' bg='green.500'></Box>
    );
  }

  if (networkState === 'offline') {
    connectionState = <Box w='14px' h='14px' rounded='full' bg='red'></Box>;
  }

  if (networkState === 'slow') {
    connectionState = <Box w='14px' h='14px' rounded='full' bg='#ffc700'></Box>;
  }

  return (
    <>
      <Flex
        as='footer'
        bg={bgFooter}
        py='5'
        justify='center'
        direction='column'
        align='center'
        fontSize='sm'
      >
        Hecho con ❤ por Franqsanz
        <Link
          as={NavLink}
          to='/privacy-policies'
          mt='2'
          textDecoration='underline'
          _hover={{ textDecoration: 'none' }}
        >
          Políticas de Privacidad
        </Link>
        <Flex
          mt='3'
          align='center'
          fontSize='xs'
          bg='black'
          p='2'
          rounded='lg'
          color='#EAEAEA'
        >
          <Box mr='2'>Estado de conexión</Box>
          {connectionState}
        </Flex>
      </Flex>
    </>
  );
}
