import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  Flex,
  Box,
  Text,
  Container,
  Image,
  Heading,
  useColorModeValue,
  useColorMode,
  Link,
  Icon,
  Stack,
} from '@chakra-ui/react';

import { Title } from '../components/Title';
import iconBook from '../assets/imgBook.svg';
import iconBookReading from '../assets/iconBookReading.svg';
import iconsBooksGray from '../assets/iconsBooksGray.svg';
import iconsBooksDark from '../assets/iconsBooksDark.svg';

export function Home() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Title title='XBuniverse' />
      <Container
        maxW='9xl'
        p='0'
        bg={useColorModeValue('gray.50', 'none')}
        backgroundImage={colorMode === 'dark' ? iconsBooksDark : iconsBooksGray} // backgroundAttachment='fixed'
      >
        <Box py={{ base: 10, md: '20vh' }} pt={{ base: 24, lg: 28 }}>
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
          <Box maxW='2xl' m='auto'>
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
                to='/register'
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
                Regístrate
              </Link>
              <Link
                w={{ base: '250px', md: '200px' }}
                to='/explore'
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
        </Box>
      </Container>
      <Flex
        w='full'
        justify='center'
        align='flex-start'
        maxWidth='5xl'
        m='auto'
        pt='28'
        px='10'
        direction={{ base: 'column', md: 'row' }}
      >
        <Image src={iconBook} w='500px' alt='' />
        <Stack direction='column' ml={{ base: 0, md: 3 }} spacing='4'>
          <Heading
            mb='10'
            mt={{ base: 14, md: 0 }}
            fontSize='4xl'
            fontFamily='Poppins, sans-serif'
          >
            ¿Qué es XBuniverse?
          </Heading>
          <Text fontSize='lg'>
            Es un sitio donde cualquiera puede compartir sus libros favoritos!
          </Text>
          <Text fontSize='lg'>
            ¡Crea una cuenta y empieza a compartir y explorar!
          </Text>
          <Text fontSize='lg'>Es muy facil de usar!</Text>
        </Stack>
      </Flex>
      <Flex
        w='full'
        justify='center'
        align='flex-start'
        maxWidth='5xl'
        m='auto'
        py={{ base: 10, md: 28 }}
        px='10'
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack
          direction='column'
          ml={{ base: 0, md: 3 }}
          mr={{ base: 0, md: 7 }}
          mb='3'
        >
          <Heading
            mb='10'
            mt={{ base: 10, md: 0 }}
            fontSize='4xl'
            fontFamily='Poppins, sans-serif'
          >
            Explora cientos de libros
          </Heading>
          <Text fontSize='lg' mb={{ base: 14, md: 0 }}>
            Descubre que leer en tu proximo viaje o tiempo libre.
          </Text>
        </Stack>
        <Image src={iconBookReading} w='500px' alt='' />
      </Flex>
    </>
  );
}
