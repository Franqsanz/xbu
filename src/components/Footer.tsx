import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, useColorModeValue, Link } from '@chakra-ui/react';

export function Footer() {
  const bgFooter = useColorModeValue('gray.100', 'gray.900');

  return (
    <>
      <Flex
        as='footer'
        bg={bgFooter}
        py='10'
        justify='center'
        direction='column'
        align='center'
      >
        Hecho con ❤ por Franqsanz
        <Link as={NavLink} to='/privacy-policies' mt='3'>
          Política de Privacidad
        </Link>
      </Flex>
    </>
  );
}
