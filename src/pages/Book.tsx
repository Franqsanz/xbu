import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Spinner,
  Image,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import LazyLoad from 'react-lazy-load';

import { useBook } from '../hooks/querys';
import { handleImageLoad } from '../utils/utils';
import { MainHead } from '../components/Head';
import { TagComponent } from '../components/TagComponent';
const CategoriesComp = lazy(() => import('../components/CategoriesComp'));
const RelatedPost = lazy(() => import('../components/RelatedPost'));

export function Book() {
  const { id } = useParams();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  const infoTextColor = useColorModeValue('gray.600', 'gray.400');
  let uiLink;

  const { data } = useBook(id);

  if (data.sourceLink === '') {
    uiLink = (
      <Box mb='10'>
        <Box
          as='span'
          ml='2'
          fontSize='md'
          fontStyle='italic'
          color={infoTextColor}
        >
          El autor de la publicación no a proporsionado un link
        </Box>
      </Box>
    );
  } else {
    uiLink = (
      <Link
        w={{ base: '100%', md: '165px' }}
        display='block'
        href={data.sourceLink}
        isExternal
        bg='#2de000'
        color='black'
        p='3'
        border='1px'
        rounded='10'
        textAlign='center'
        _hover={{ outline: 'none', bg: '#28c900' }}
      >
        <Flex align='center' justify='center'>
          Comprar Libro
          <FiExternalLink style={{ marginLeft: '6px' }} />
        </Flex>
      </Link>
    );
  }

  return (
    <>
      <MainHead
        title={`${data.title} | XBuniverse`}
        description={data.synopsis}
        urlImage='https://xbu.netlify.app/ogImage.png'
      />
      <Flex
        w='full'
        maxW='1300px'
        m='auto'
        mt={{ base: 5, md: 10 }}
        mb='25'
        align='flex-start'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box display={{ base: 'block', md: 'none' }} mx='5' mt='4'>
          <TagComponent name={data.category} />
        </Box>
        <Box display={{ base: 'block', md: 'none' }} m='auto' py='4'>
          <LazyLoad width={160} height={230} offset={0} threshold={0.99}>
            <Image
              w='160px'
              h='230px'
              src={data.image.url}
              alt={`Imagen de "${data.title}"`}
              rounded='md'
              border='1px solid #A0AEC0'
              boxShadow='xl'
              decoding='async'
              filter='blur(10px)'
              transition='filter 0.5s ease-in-out'
              onLoad={handleImageLoad}
            />
          </LazyLoad>
        </Box>
        <Flex
          w='full'
          maxW='920px'
          direction='column'
          justify='center'
          px='5'
          m='1rem auto'
        >
          <Box display={{ base: 'none', md: 'block' }}>
            <TagComponent name={data.category} />
          </Box>
          <Box
            as='h1'
            fontSize={{ base: '2xl', md: '4xl' }}
            my='5'
            textTransform='uppercase'
          >
            {data.title}
          </Box>
          <Box
            my='1'
            fontSize={{ base: 'lg', md: '2xl' }}
            textTransform='uppercase'
          >
            {data.author}
          </Box>
          <Box mt='5'>
            <Box
              p='2'
              fontSize='xl'
              bg={useColorModeValue('gray.200', 'gray.600')}
              roundedTop='lg'
            >
              Sinopsis
            </Box>
            <Text mt='3' mx='2' mb='10' fontSize='lg'>
              {data.synopsis}
            </Text>
          </Box>
          <Box p='2' fontSize='xl' bg={grayColor} roundedTop='lg'>
            Caracteristicas
          </Box>
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p='4'
            roundedBottom='lg'
          >
            <Flex direction='column'>
              <Box>
                <Flex>
                  <Box w='160px'>
                    <Box as='span'>Autor:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.author}</Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box w='160px'>
                    <Box as='span'>Año:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.year}</Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box w='160px'>
                    <Box as='span'>N° paginas:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.numberPages}</Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box w='160px'>
                    <Box as='span'>Idioma:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.language}</Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box w='160px'>
                    <Box as='span'>Formato:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.format}</Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box mt='10'>{uiLink}</Box>
          <Box my='14'>
            <Divider borderColor='gray.400' />
          </Box>
          <Flex direction='column'>
            <Box p='2' mb='2' bg={grayColor} fontSize='xl' roundedTop='lg'>
              Más libros en XBuniverse
            </Box>
            <Suspense
              fallback={
                <Box p='3'>
                  <Spinner size='lg' />
                </Box>
              }
            >
              <Box>
                <RelatedPost />
              </Box>
            </Suspense>
          </Flex>
        </Flex>
        <Flex w={{ base: 'full', lg: '400px' }} px='3'>
          <Box
            maxW={{ base: '920px', lg: '300px' }}
            p='4'
            m='1rem auto'
            rounded='10'
            border='1px'
            borderColor={grayColor}
            boxShadow='lg'
          >
            <Box display={{ base: 'none', lg: 'flex' }} justifyContent='center'>
              <LazyLoad width={234} height={360} offset={0} threshold={0.99}>
                <Image
                  w='234px'
                  h='360px'
                  src={data.image.url}
                  alt={`Imagen de "${data.title}"`}
                  rounded='lg'
                  border='1px solid #A0AEC0'
                  boxShadow='xl'
                  decoding='async'
                  filter='blur(10px)'
                  transition='filter 0.5s ease-in-out'
                  onLoad={handleImageLoad}
                />
              </LazyLoad>
            </Box>
            <Box
              mt={{ base: 0, md: 8 }}
              mb='3'
              fontSize='2xl'
              textAlign='center'
            >
              Categorias
            </Box>
            <Box>
              <Suspense
                fallback={
                  <Box display='flex' justifyContent='center'>
                    <Spinner size='lg' />
                  </Box>
                }
              >
                <Flex direction={{ base: 'row', xl: 'column' }} flexWrap='wrap'>
                  <CategoriesComp />
                </Flex>
              </Suspense>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
