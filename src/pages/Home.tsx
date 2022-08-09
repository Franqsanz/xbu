import React from 'react';
import { Flex, Box, Text, Spinner, Container, Heading, useColorModeValue } from '@chakra-ui/react';
// import { useQuery } from '@tanstack/react-query'

import { Nav } from '../components/Nav';
import { AllBooks } from '../components/AllBooks';

export function Home() {
  return (
    <>
      <Nav />
      <Container maxW='2xl'>
        <Box my='64'>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '6xl', md: '9xl' }}
            bgGradient='linear-gradient(to-l, #2de000, #e9f501)'
            bgClip='text'
            fontWeight='bold'
          >
            XBooks
          </Box>
          <Text
            textAlign='center'
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Comparte tus libros favoritos con la comunidad.
          </Text>
        </Box>
      </Container>
      <AllBooks />
    </>
  )
}