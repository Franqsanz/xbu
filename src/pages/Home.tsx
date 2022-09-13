import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  Flex,
  Box,
  Text,
  Spinner,
  Container,
  Image,
  Heading,
  useColorModeValue,
  Button,
  Link,
  Icon,
} from '@chakra-ui/react';

import { Title } from '../components/Title';
import { AllBooks } from '../components/AllBooks';
import i from '../assets/imgBook.svg';

export function Home() {
  return (
    <>
      <Title title='XBuniverse' />
      <Container maxW='3xl'>
        <Box my={{ base: 10, xl: 28 }} mt={{ base: 24, xl: 28 }}>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '3.35rem', md: '9xl' }}
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
            my='3'
            textAlign={{ base: 'center', md: 'left' }}
          >
            ¡Explora!
          </Box>
          <Text
            px={{ base: 5, md: 0 }}
            fontSize='lg'
            textAlign={{ base: 'center', md: 'left' }}
          >
            Comparte tus libros favoritos con la comunidad.
          </Text>
          <Flex
            mt='14'
            textAlign='center'
            direction={{ base: 'column', md: 'row' }}
            align='center'
          >
            <Link
              w={{ base: '250px', md: '200px' }}
              to='/'
              as={NavLink}
              border='1px'
              bg={useColorModeValue('#2de000', '#24b300')}
              color='black'
              borderRadius='lg'
              p='3'
              fontSize='xl'
              _hover={{
                outline: 'none',
                bg: '#28c900',
              }}
            >
              Registrarse
            </Link>
            <Link
              w={{ base: '250px', md: '200px' }}
              to='/explorer'
              as={NavLink}
              border='1px'
              borderColor='black'
              bg={useColorModeValue('#2de000', '#24b300')}
              color='black'
              borderRadius='lg'
              mt={{ base: 5, md: 0 }}
              p='3'
              ml={{ base: 0, md: 5 }}
              fontSize='xl'
              _hover={{
                outline: 'none',
                bg: '#28c900',
              }}
            >
              <Flex align='center' justify='center'>
                Explorar
                <Icon as={FiArrowRight} ml='2' />
              </Flex>
            </Link>
          </Flex>
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
            ¿Qué es XBuniverse?
          </Heading>
          <Text fontSize='lg'>
            XBuniverse es un sitio donde cualquiera puede compartir sus libros
            favoritos o recomendarlos!
          </Text>
        </Flex>
      </Flex>
      <AllBooks />
    </>
  );
}
