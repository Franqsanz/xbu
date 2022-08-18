import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export function Footer() {
  return (
    <>
      <Flex
        as='footer'
        bg={useColorModeValue('gray.100', 'gray.900')}
        py='10'
        justify='center'
      >
        Hecho con ❤ por Franqsanz
      </Flex>
    </>
  );
}
