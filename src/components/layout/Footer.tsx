import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, useColorModeValue, Link } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

import { useNetworkState } from '@hooks/useNetworkState';
import { useMyToast } from '@hooks/useMyToast';
import { currentYear } from '@utils/utils';

export function Footer() {
  const myToast = useMyToast();
  const bgFooter = useColorModeValue('gray.100', 'gray.900');
  const networkState = useNetworkState();
  const [prevNetworkState, setPrevNetworkState] = useState(networkState);
  let connectionState;

  useEffect(() => {
    if (prevNetworkState !== networkState) {
      setPrevNetworkState(networkState);

      if (networkState === 'offline') {
        myToast({
          title: 'Conexión Perdida',
          icon: MdError,
          iconColor: 'red.600',
          bgColor: 'red.50',
          position: 'bottom',
          color: '#C53030',
          width: 'auto',
          align: 'center',
          fntSize: 'sm',
          bxSize: 4,
        });
      } else if (networkState === 'online') {
        myToast({
          title: 'De nuevo en línea',
          icon: FaCheckCircle,
          iconColor: 'green.800',
          bgColor: '#EAFFE5',
          position: 'bottom',
          color: '#22543D',
          width: 'auto',
          align: 'center',
          fntSize: 'sm',
          bxSize: 4,
        });
      }
    }
  }, [networkState, prevNetworkState, myToast]);

  if (networkState === 'online') {
    connectionState = <Box w='14px' h='14px' rounded='full' bg='green.500'></Box>;
  }

  if (networkState === 'offline') {
    connectionState = <Box w='14px' h='14px' rounded='full' bg='red'></Box>;
  }

  if (networkState === 'slow') {
    connectionState = <Box w='14px' h='14px' rounded='full' bg='#ffc700'></Box>;
  }

  return (
    <>
      <Box as='footer' mt='auto'>
        <Flex
          bg={bgFooter}
          mt='20'
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
          <Box display={{ base: 'none', md: 'block' }} fontSize='14px' my='2'>
            {currentYear} XBuniverse
          </Box>
          <Flex
            mt={{ base: 4, md: 2 }}
            align='center'
            fontSize='xs'
            bg='black'
            p='1.5'
            rounded='lg'
            color='#EAEAEA'
          >
            <Box mr='2'>Estado de conexión</Box>
            {connectionState}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
