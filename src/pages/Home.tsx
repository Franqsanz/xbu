import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import LazyLoad from 'react-lazy-load';
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
  useBreakpointValue,
} from '@chakra-ui/react';

import { MainHead } from '@components/Head';
import {
  PatternPadWhite,
  PatternPadBlack,
  ImgBook,
  BookReading,
} from '@assets/assets';

export function Home() {
  const { colorMode } = useColorMode();
  const bgButton = useColorModeValue('green.500', 'green.700');
  const bContainer = useColorModeValue('gray.50', 'none');
  const height = useBreakpointValue({
    base: '163px',
    sm: '311px',
    md: '268px',
  });

  return (
    <>
      <MainHead
        title='XBuniverse'
        description='Comparte tus libros favoritos con la comunidad.'
        urlImage='https://xbu.netlify.app/ogImage.png'
      />
      <Container
        maxW='9xl'
        p='0'
        bg={bContainer}
        backgroundSize='cover'
        backgroundPosition='center center'
        backgroundImage={
          colorMode === 'dark' ? PatternPadBlack : PatternPadWhite
        }
        backgroundAttachment='fixed'
      >
        <Box py={{ base: 10, md: '20vh' }} pt={{ base: 24, lg: 28 }}>
          <Box
            textAlign='center'
            as='h1'
            fontSize={{ base: '3.35rem', md: '9xl' }}
            bgGradient='linear-gradient(to-l, green.500, #e9f501)'
            bgClip='text'
          >
            XBuniverse
          </Box>
          <Box maxW='2xl' m='auto'>
            <Box
              color='green.800'
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight='bold'
              my='3'
              textAlign={{ base: 'center', md: 'left' }}
            >
              ¡Explora!
            </Box>
            <Text
              px={{ base: 5, md: 0 }}
              fontSize={{ base: 'md', md: 'lg' }}
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
                to='/login'
                as={NavLink}
                border='1px'
                bg={bgButton}
                color='black'
                borderRadius='lg'
                p='3'
                fontSize='xl'
                _hover={{
                  outline: 'none',
                  bg: 'green.600',
                }}
              >
                Ingresar
              </Link>
              <Link
                w={{ base: '250px', md: '200px' }}
                to='/explore'
                as={NavLink}
                border='1px'
                borderColor='black'
                bg={bgButton}
                color='black'
                borderRadius='lg'
                mt={{ base: 5, md: 0 }}
                p='3'
                ml={{ base: 0, md: 5 }}
                fontSize='xl'
                _hover={{
                  outline: 'none',
                  bg: 'green.600',
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
        maxW='5xl'
        m='auto'
        pt='28'
        px='10'
        direction={{ base: 'column', md: 'row' }}
      >
        <LazyLoad height={height} offset={0}>
          <Image src={ImgBook} w='500px' alt='' decoding='async' />
        </LazyLoad>
        <Stack maxW='md' direction='column' ml={{ base: 0, md: 5 }} spacing='4'>
          <Heading
            mb='5'
            mt={{ base: 14, md: 0 }}
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontFamily='Poppins, sans-serif'
          >
            ¿Qué es XBuniverse?
          </Heading>
          <Text fontSize='lg'>
            XBuniverse es una plataforma en línea que permite a los usuarios
            compartir y descubrir libros de su elección. Cualquier persona puede
            crear una cuenta y comenzar a compartir sus libros favoritos con
            otros usuarios de la comunidad.
          </Text>
          <Text fontSize='lg'>
            Además de compartir libros, también puedes explorar una amplia
            selección de títulos disponibles y descubrir nuevas lecturas
            interesantes.
          </Text>
          <Text fontSize='lg'>
            La plataforma es muy fácil de usar, lo que significa que puedes
            comenzar a compartir y explorar libros en cuestión de minutos.
          </Text>
          <Text fontSize='lg' fontWeight='500'>
            ¡Regístrate ahora en XBuniverse y únete a esta comunidad de amantes
            de la lectura!
          </Text>
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
          maxW='md'
          direction='column'
          ml={{ base: 0, md: 3 }}
          mr={{ base: 0, md: 7 }}
          mb='3'
        >
          <Heading
            mb='5'
            mt={{ base: 10, md: 0 }}
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontFamily='Poppins, sans-serif'
          >
            Explora cientos de libros
          </Heading>
          <Text fontSize='lg'>
            XBuniverse te ofrece una amplia selección de libros para que puedas
            sumergirte en diferentes géneros literarios y descubrir historias
            emocionantes, conocimientos fascinantes y aventuras inolvidables.
          </Text>
          <Text fontSize='lg'>
            Ya sea que estés buscando un libro para acompañarte en tu próximo
            viaje o simplemente para disfrutar en tu tiempo libre.
          </Text>
        </Stack>
        <LazyLoad offset={0}>
          <Image src={BookReading} w='500px' alt='' decoding='async' />
        </LazyLoad>
      </Flex>
    </>
  );
}
