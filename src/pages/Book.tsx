import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
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
import { BsTag } from 'react-icons/bs';
import LazyLoad from 'react-lazy-load';

import { useBook } from '../hooks/querys';
import { handleImageLoad } from '../utils/utils';
import { MainHead } from '../components/Head';
import { MyTag } from '../components/MyTag';
import { ModalShare } from '../components/ModalShare';
import { MyLink } from '../components/MyLink';
const Categories = lazy(() => import('../components/Categories'));
const RelatedPost = lazy(() => import('../components/RelatedPost'));

export default function Book() {
  const shareUrl = window.location.href;
  const { pathUrl } = useParams();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  const bgGrayCategory = useColorModeValue('gray.100', 'gray.700');
  const gradientColor = useColorModeValue('white', '#1A202C');
  const infoTextColor = useColorModeValue('gray.600', 'gray.400');
  const bgButton = useColorModeValue('white', 'black');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let uiLink;

  const { data } = useBook(pathUrl);

  console.log(data.authors);

  function handleGoBack() {
    navigate(-1);
  }

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
          Ir a librería
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
      <Box
        w='full'
        maxW='1255px'
        m='auto'
        px={{ base: 5, xl: 0 }}
        pt='4'
        pb='5'
      >
        <Button
          mt={{ base: 1, md: 5 }}
          fontWeight='500'
          w='90px'
          size='sm'
          onClick={handleGoBack}
        >
          <Flex align='center' justify='center'>
            <Icon as={FiArrowLeft} boxSize='4' mr='1' />
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
        direction={{ base: 'column', lg: 'row-reverse' }}
      >
        <Box
          as='figure'
          display={{ base: 'block', lg: 'none' }}
          m='auto'
          pb='4'
        >
          <LazyLoad width={230} height={340} offset={0} threshold={0.99}>
            <Image
              w='230px'
              h='340px'
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
          m='auto'
          mt='1rem'
          mb='2'
        >
          <Box>
            <Link
              as={NavLink}
              to={`/books/search/category/${data.category[0]}`}
            >
              <MyTag
                bg='green.50'
                color='green.900'
                icon={BsTag}
                name={data.category[0]}
                size='lg'
                tabIndex={-1}
              />
            </Link>
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
            fontSize={{ base: 'md', md: 'xl' }}
            textTransform='uppercase'
          >
            {data.authors.map((author, index) => (
              <MyLink
                external={true}
                key={index}
                href={`https://www.google.com/search?q=${author}+escritor`}
                data={author}
                index={index !== data.authors.length - 1 && ' & '}
              />
            ))}
          </Box>
          <Box mt='5'>
            <Box p='2' fontSize='lg' bg={grayColor} roundedTop='lg'>
              Sinopsis
            </Box>
            <Text mt='3' mb='10' fontSize='md' whiteSpace='pre-wrap'>
              {data.synopsis}
            </Text>
          </Box>
          <Box p='2' fontSize='lg' bg={grayColor} roundedTop='lg'>
            Caracteristicas
          </Box>
          <Box bg={bgGrayCategory} p='4' roundedBottom='lg'>
            <Flex direction='column'>
              <Box>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>Autor(s):</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      {data.authors.map((author, index) => (
                        <MyLink
                          external={true}
                          key={index}
                          href={`https://www.google.com/search?q=${author}+escritor`}
                          data={author}
                          index={index !== data.authors.length - 1 && ' & '}
                        />
                      ))}
                    </Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box minW='160px'>
                    <Box as='span'>Año:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      <MyLink
                        external={false}
                        href={`/books/search/year/${data.year}`}
                        data={data.year}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>N° paginas:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.numberPages}</Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box minW='160px'>
                    <Box as='span'>Idioma:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      <MyLink
                        external={false}
                        href={`/books/search/language/${data.language}`}
                        data={data.language}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box minW='160px'>
                    <Box as='span'>Formato:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{data.format}</Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>Categoria(s):</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      {data.category.map((category, index) => (
                        <MyLink
                          external={false}
                          key={index}
                          href={`/books/search/category/${category}`}
                          data={category}
                          index={index !== data.category.length - 1 && ', '}
                        />
                      ))}
                    </Box>
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
              borderColor='green.600'
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
          <Flex direction='column'>
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
                <RelatedPost currentBookId={pathUrl} />
              </Box>
            </Suspense>
          </Flex>
        </Flex>
        <Flex
          display={{ base: 'none', lg: 'block' }}
          as='aside'
          w='335px'
          px='3'
          position='sticky'
          top='65px'
        >
          <Box maxW={{ base: '920px', lg: 'auto' }} m='1rem auto'>
            <Flex
              as='figure'
              justifyContent='center'
              zIndex='9999'
              position='relative'
            >
              <LazyLoad width={290} height={420} offset={0} threshold={0.99}>
                <Image
                  w='290px'
                  h='420px'
                  src={data.image.url}
                  alt={`Imagen de "${data.title}"`}
                  rounded='lg'
                  border='1px solid #A0AEC0'
                  boxShadow='lg'
                  decoding='async'
                  filter='blur(10px)'
                  transition='filter 0.5s ease-in-out'
                  onLoad={handleImageLoad}
                />
              </LazyLoad>
            </Flex>
            <Image
              w='290px'
              h='420px'
              src={data.image.url}
              position='absolute'
              bottom='710px'
              left='6px'
              opacity='50%'
              rounded='lg'
              decoding='async'
              filter='blur(10px)'
            />
            <Box
              h='650px'
              overflowX='hidden'
              mt='14'
              p='0 1.25rem 0 1.25rem'
              border='1px'
              borderColor={grayColor}
              boxShadow='xl'
              rounded='xl'
              position='relative'
              sx={{
                '&::-webkit-scrollbar': {
                  width: '7px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#a2aab3',
                  borderRadius: '30px',
                },
              }}
            >
              <Box
                p='1.25rem 2px 2px 2px'
                h='24'
                fontSize='2xl'
                position='sticky'
                top='0'
                bgGradient={`linear(360deg, #ffffff00 0%, ${gradientColor} 20%)`}
              >
                Categorías
                <Box mt='2' borderBottom='1px'></Box>
              </Box>
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
              <Box
                position='sticky'
                h='7'
                bottom='0'
                bgGradient={`linear(180deg, #ffffff00 0%, ${gradientColor} 50%)`}
              ></Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
