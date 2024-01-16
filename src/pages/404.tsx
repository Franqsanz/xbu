import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Text, VStack, Box, Image, Flex, Icon } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import { MainHead } from '@components/Head';
import { PageNotFound } from '@assets/assets';

export function ErrorPage() {
  return (
    <>
      <MainHead title='Page not found' />
      <VStack fontSize={{ base: 'lg', md: '2xl' }} py='44' h='90vh'>
        <Box>
          <Image
            src={PageNotFound}
            w={{ base: '200px', md: '400px' }}
            decoding='async'
          />
        </Box>
        <Text mt='5' pb='5'>
          ¡Está pagina no existe!
        </Text>
        <Link
          to='/'
          as={NavLink}
          border='1px'
          borderColor='green.500'
          borderRadius='lg'
          p='3'
          fontSize='xl'
          _hover={{
            outline: 'none',
            bg: 'green.500',
            color: 'black',
            borderColor: 'black',
          }}
        >
          <Flex align='center'>
            <Icon as={FiArrowLeft} mr='2' />
            Volver al inicio
          </Flex>
        </Link>
      </VStack>
    </>
  );
}
