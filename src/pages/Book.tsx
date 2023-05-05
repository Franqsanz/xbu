import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Spinner,
  Image,
  Button,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FiArrowLeft, FiExternalLink, FiShare2 } from 'react-icons/fi';
import LazyLoad from 'react-lazy-load';

import { useBook } from '../hooks/querys';
import { handleImageLoad } from '../utils/utils';
import { MainHead } from '../components/Head';
import { MyTag } from '../components/MyTag';
import { ModalShare } from '../components/ModalShare';
const Categories = lazy(() => import('../components/Categories'));
const RelatedPost = lazy(() => import('../components/RelatedPost'));

export default function Book() {
  const shareUrl = window.location.href;
  const { id } = useParams();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  const infoTextColor = useColorModeValue('gray.600', 'gray.400');
  const bgButton = useColorModeValue('white', 'black');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  let uiLink;

  function handleGoBack() {
    navigate(-1);
  }

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
        bg='green.500'
        color='black'
        p='3'
        border='1px'
        rounded='lg'
        textAlign='center'
        _hover={{ outline: 'none', bg: 'green.600' }}
      >
        <Flex align='center' justify='center'>
          <FiExternalLink style={{ marginRight: '6px' }} />
          Comprar Libro
        </Flex>
      </Link>
    );
  }

  return (
    <>
      <MainHead
        title={`${data.title} | XBuniverse`}
        description={data.synopsis}
        urlImage={data.image.url}
      />
      <Box w='full' maxW='1300px' m='auto' px='2' py='4'>
        <Button
          bg='none'
          mt={{ base: 1, md: 5 }}
          fontWeight='500'
          w='100px'
          onClick={handleGoBack}
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
        >
          <Flex align='center' justify='center'>
            <Icon as={FiArrowLeft} boxSize='5' mr='2' />
            Volver
          </Flex>
        </Button>
      </Box>
      <Flex
        w='full'
        maxW='1300px'
        m='auto'
        mb='25'
        align='flex-start'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box display={{ base: 'block', lg: 'none' }} m='auto' py='4'>
          <LazyLoad width={200} height={290} offset={0} threshold={0.99}>
            <Image
              w='200px'
              h='290px'
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
          <Box>
            <MyTag name={data.category} size='lg' tabIndex={-1} />
          </Box>
          <Box
            as='h1'
            fontSize={{ base: '2xl', md: '4xl' }}
            mt='5'
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
            <Text mt='3' mb='10' fontSize='lg'>
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
          <Flex direction={{ base: 'column', md: 'row' }} mt='10' gap='3'>
            {uiLink}
            <Button
              w={{ base: '100%', md: '130px' }}
              bg={bgButton}
              fontWeight='normal'
              onClick={onOpen}
              p='6'
              border='1px'
              borderColor='#28c900'
              rounded='lg'
              textAlign='center'
              _hover={{ color: 'white', bg: 'black' }}
            >
              <Flex align='center' justify='center'>
                <FiShare2 style={{ marginRight: '6px' }} />
                Compartir
              </Flex>
            </Button>
          </Flex>
          <ModalShare
            isOpen={isOpen}
            onClose={onClose}
            shareUrl={shareUrl}
            data={data.title}
          />
          <Box my='10'>
            <Divider borderColor='gray.400' />
          </Box>
          <Flex direction='column' mb='10'>
            <Box
              p='2'
              mb='3'
              fontSize={{ base: 'xl', md: '2xl' }}
              textAlign={{ base: 'center', lg: 'left' }}
              ml={{ base: 0, lg: 2 }}
            >
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
                <RelatedPost currentBookId={id} />
              </Box>
            </Suspense>
          </Flex>
        </Flex>
        <Flex display={{ base: 'none', lg: 'block' }} w='400px' px='3'>
          <Box
            maxW={{ base: '920px', lg: '300px' }}
            p='4'
            m='1rem auto'
            rounded='lg'
            border='1px'
            borderColor={grayColor}
            boxShadow='lg'
          >
            <Flex justifyContent='center'>
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
            </Flex>
            <Box mt='8' mb='3' fontSize='2xl' textAlign='center'>
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
                <Flex direction='column' flexWrap='wrap'>
                  <Categories />
                </Flex>
              </Suspense>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
