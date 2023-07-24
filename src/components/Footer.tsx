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
      </Flex>
    </>
  );
}
