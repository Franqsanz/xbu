import React from 'react';
import {
  Flex,
  Box,
  Text,
  Spinner,
  Container,
  Image,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import { Title } from '../components/Title';
import { AllBooks } from '../components/AllBooks';
import i from '../assets/imgBook.svg';

export function Home() {
  return (
    <>
      <Title title='XBuniverse' />
      <Container maxW='3xl'>
        <Box my={{ base: 10, md: 32, xl: 40 }} mt={{ base: 24, md: 0 }}>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '5xl', md: '9xl' }}
            bgGradient='linear-gradient(to-l, #2de000, #e9f501)'
            bgClip='text'
            fontWeight='extrabold'
          >
            XBuniverse
          </Box>
          <Box
            color='green'
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            textAlign={{ base: 'center', md: 'left' }}
          >
            ¡Explora!
          </Box>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Comparte tus libros favoritos con la comunidad.
          </Text>
        </Box>
      </Container>
      <Flex
        justify='center'
        align='center'
        w='full'
        maxWidth='5xl'
        m='auto'
        py='14'
        px='7'
        direction={{ base: 'column', md: 'row' }}
      >
        <Image src={i} w='500px' alt='' />
        <Flex direction='column' ml={{ base: 0, md: 3 }}>
          <Heading
            mb='10'
            mt={{ base: 14, md: 0 }}
            fontSize='4xl'
            fontFamily='Poppins, sans-serif'
          >
            ¿Que es XBuniverse?
          </Heading>
          <Text fontSize='lg'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
            veniam dolorem vitae doloremque, odit omnis, adipisci a quia, quasi
            corrupti nisi illum ut! Corporis ab earum voluptate porro nam sed?
          </Text>
        </Flex>
      </Flex>
      <AllBooks />
    </>
  );
}
