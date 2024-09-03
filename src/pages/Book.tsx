import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Center,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Spinner,
  Image,
  Button,
  useDisclosure,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiArrowLeft,
  FiExternalLink,
  FiShare2,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { BsTag } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import LazyLoad from 'react-lazy-load';
import Atropos from 'atropos/react';
import 'atropos/css';

import { useBook, useFavoriteBook, useDeleteBook } from '@hooks/queries';
import { handleImageLoad } from '@utils/utils';
import { MainHead } from '@components/layout/Head';
import { MyTag } from '@components/ui/MyTag';
import { ModalShare } from '@components/modals/ModalShare';
import { MyLink } from '@components/ui/MyLink';
import { Views } from '@components/ui/Views';
import { BooksSection } from '@components/BooksSection';
import { ImageZoom } from '@components/ui/ImageZoom';
import { ModalOptions } from '@components/modals/ModalOptions';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
import { ModalForm } from '@components/modals/ModalForm';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';

const Categories = lazy(() => import('@components/Categories'));
const MoreBooksAuthors = lazy(() => import('@components/cards/MoreBooksAuthors'));
const RelatedBooks = lazy(() => import('@components/cards/RelatedBooks'));
const MoreBooks = lazy(() => import('@components/cards/MoreBooks'));

export default function Book() {
  const shareUrl = window.location.href;
  const location = useLocation();
  const getToken = window.localStorage.getItem('app_tk');
  const { pathUrl } = useParams();
  const { currentUser } = useAuth();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  const bgGrayCategory = useColorModeValue('gray.100', 'gray.700');
  const gradientColor = useColorModeValue('white', '#1A202C');
  const bgButton = useColorModeValue('white', 'black');
  const navigate = useNavigate();
  const myToast = useMyToast();
  const {
    isOpen: isOpenOptions,
    onOpen: onOpenOptions,
    onClose: onCloseOptions,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmation,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenShare,
    onOpen: onOpenShare,
    onClose: onCloseShare,
  } = useDisclosure();
  let uiLink;
  let btnMoreOptions;
  let btnFavorite;

  const { data } = useBook(pathUrl, getToken);
  let bookObject = data;

  if (Array.isArray(bookObject)) {
    const [obj] = data;
    bookObject = obj;
  } else {
    bookObject = data;
  }

  const [isFavorite, setIsFavorite] = useState<boolean>(bookObject.isFavorite);
  const { mutate: mutateFavorite, isSuccess: successFavorite } = useFavoriteBook(
    bookObject.id,
    isFavorite,
  );
  const {
    mutate: mutateDelete,
    isSuccess: successDelete,
    isPending,
  } = useDeleteBook();

  const isCurrentUserAuthor = currentUser && currentUser.uid === bookObject.userId;

  useEffect(() => {
    setIsFavorite(bookObject.isFavorite);
  }, [bookObject.isFavorite, location.pathname]);

  if (currentUser && isCurrentUserAuthor) {
    btnMoreOptions = (
      <Tooltip label='Más Opciones' fontSize='sm' bg='black' color='white'>
        <Button
          mt={{ base: 1, md: 5 }}
          fontWeight='500'
          size='sm'
          onClick={onOpenOptions}
        >
          <Flex align='center' justify='center'>
            <Icon as={FiMoreHorizontal} />
          </Flex>
        </Button>
      </Tooltip>
    );
  }

  async function handleToggleFavorite() {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    return await mutateFavorite(currentUser?.uid);
  }

  if (successFavorite) {
    myToast({
      title: isFavorite ? 'Se agrego a favoritos' : 'Se quito de favoritos',
      icon: FaCheckCircle,
      iconColor: 'green.700',
      bgColor: 'black',
      width: '200px',
      color: 'whitesmoke',
      align: 'center',
      padding: '1',
      fntSize: 'md',
      bxSize: 5,
    });
  }

  if (currentUser) {
    btnFavorite = (
      <Tooltip
        label={isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
        fontSize='sm'
        bg='black'
        color='white'
      >
        <Button mt={{ base: 1, md: 5 }} size='sm' onClick={handleToggleFavorite}>
          <Flex align='center' justify='center'>
            <Icon
              as={isFavorite ? MdOutlineFavorite : MdOutlineFavoriteBorder}
              boxSize={5}
            />
          </Flex>
        </Button>
      </Tooltip>
    );
  }

  if (successDelete) {
    myToast({
      title: 'Libro eliminado',
      description: 'Se ha eliminado exitosamente.',
      icon: FaCheckCircle,
      iconColor: 'green.700',
      bgColor: 'black',
      width: '300px',
      color: 'white',
      align: 'center',
      padding: '2',
      fntSize: 'md',
      bxSize: 5,
    });

    navigate('/explore', { replace: true });
  }

  function handleDeleteBook() {
    return mutateDelete(bookObject.id);
  }

  function handleGoBack() {
    return navigate(-1);
  }

  if (bookObject.sourceLink === '') {
    uiLink = (
      <Box mb='10' w={{ base: '100%', md: '380px' }}>
        <Box as='p' ml='2' fontSize='md' fontStyle='italic'>
          El autor de la publicación no ha proporcionado un link.
        </Box>
      </Box>
    );
  } else {
    uiLink = (
      <Link
        w={{ base: '100%', md: '165px' }}
        display='block'
        href={bookObject.sourceLink}
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
        title={`${bookObject.title} | XBuniverse`}
        description={bookObject.synopsis}
        urlImage={bookObject.image.url}
      />
      <Flex
        as='section'
        w='full'
        maxW='1170px'
        m='auto'
        px={{ base: 5, xl: 0 }}
        pt='4'
        pb='5'
        justify='space-between'
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
        <Flex gap='2'>
          {btnFavorite}
          {btnMoreOptions}
        </Flex>
      </Flex>
      <ModalOptions
        isOpen={isOpenOptions}
        onClose={onCloseOptions}
        onDeleteBook={onOpenConfirmation}
        onEditBook={() => {
          onOpenEdit();
          onCloseOptions();
        }}
      />
      <ModalConfirmation
        isOpen={isOpenConfirmation}
        title={bookObject.title}
        isStrong={true}
        warningText='El libro será eliminado de manera permanente y no se podrá recuperar.'
        onDeleteBook={handleDeleteBook}
        isPending={isPending}
        onClose={() => {
          onCloseConfirmation();
          onCloseOptions();
        }}
      />
      <ModalForm
        isOpen={isOpenEdit}
        id={bookObject.id}
        title={bookObject.title}
        authors={bookObject.authors}
        synopsis={bookObject.synopsis}
        year={bookObject.year}
        category={bookObject.category}
        numberPages={bookObject.numberPages}
        sourceLink={bookObject.sourceLink}
        language={bookObject.language}
        format={bookObject.format}
        image={{
          url: bookObject.image.url,
          public_id: bookObject.image.public_id,
        }}
        onClose={onCloseEdit}
      />
      <Flex
        as='section'
        w='full'
        maxW='1220px'
        m='auto'
        mb={{ base: 25, md: 32 }}
        align='flex-start'
        direction={{ base: 'column', lg: 'row-reverse' }}
      >
        <Box
          as='figure'
          display={{ base: 'block', lg: 'none' }}
          m='auto'
          pb='16'
          zIndex='0'
        >
          <LazyLoad width={230} height={340} offset={0} threshold={0.99}>
            <ImageZoom
              w='230px'
              h='340px'
              src={bookObject.image.url}
              alt={`Imagen de "${bookObject.title}"`}
              rounded='md'
              border='1px solid #A0AEC0'
              boxShadow='xl'
              decoding='async'
              filter='blur(10px)'
              transition='filter 0.5s ease-in-out'
              onLoad={handleImageLoad}
            />
          </LazyLoad>
          <Views
            justify='center'
            align='stretch'
            mt='6'
            left='0'
            right='0'
            position='absolute'
            views={bookObject.views}
            bxSize='5'
          />
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
              to={`/books/filter/category/${bookObject.category[0]}`}
            >
              <MyTag
                bg='green.50'
                color='green.900'
                icon={BsTag}
                name={bookObject.category[0]}
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
            {bookObject.title}
          </Box>
          <Flex
            my='1'
            fontSize={{ base: 'md', md: 'xl' }}
            textTransform='uppercase'
            flexWrap='wrap'
          >
            {bookObject.authors.map((author, index) => (
              <MyLink
                external={false}
                key={index}
                href={`/books/filter/authors/${author}`}
                data={author}
                index={index !== bookObject.authors.length - 1 && ','}
              />
            ))}
          </Flex>
          <Box mt='5'>
            <Box p='2' fontSize='lg' bg={grayColor} roundedTop='lg'>
              Sinopsis
            </Box>
            <Text mt='3' mb='10' fontSize='md' whiteSpace='pre-wrap'>
              {bookObject.synopsis}
            </Text>
          </Box>
          <Box p='2' fontSize='lg' bg={grayColor} roundedTop='lg'>
            Caracteristicas
          </Box>
          <Box bg={bgGrayCategory} p='4' roundedBottom='lg'>
            <Flex direction='column'>
              <Box>
                <Flex mt='0' mb='2'>
                  <Box minW='160px'>
                    <Box as='span'>Año:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      <MyLink
                        external={false}
                        href={`/books/filter/year/${bookObject.year}`}
                        data={bookObject.year}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>N° paginas:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{bookObject.numberPages}</Box>
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
                        href={`/books/filter/language/${bookObject.language}`}
                        data={bookObject.language}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Flex my='2'>
                  <Box minW='160px'>
                    <Box as='span'>Formato:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>{bookObject.format}</Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>Categoria(s):</Box>
                  </Box>
                  <Box>
                    <Flex flexWrap='wrap' as='span'>
                      {bookObject.category.map((category, index) => (
                        <MyLink
                          external={false}
                          key={index}
                          href={`/books/filter/category/${category}`}
                          data={category}
                          index={index !== bookObject.category.length - 1 && ','}
                        />
                      ))}
                    </Flex>
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
              onClick={onOpenShare}
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
            isOpen={isOpenShare}
            onClose={onCloseShare}
            shareUrl={shareUrl}
            data={bookObject.title}
          />
          <BooksSection
            title='Más libros del autor'
            data={bookObject.authors[0]}
            booksComponent={
              <MoreBooksAuthors id={bookObject.id} currentBookId={pathUrl} />
            }
          />
          <BooksSection
            title='Libros relacionados con'
            data={bookObject.category[0]}
            booksComponent={
              <RelatedBooks id={bookObject.id} currentBookId={pathUrl} />
            }
          />
          <BooksSection
            title='Más libros en XBuniverse'
            booksComponent={<MoreBooks currentBookId={pathUrl} />}
          />
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
            <Flex as='figure' justifyContent='center' position='relative' zIndex='1'>
              <LazyLoad width={290} height={420} offset={0} threshold={0.99}>
                <Atropos
                  highlight={true}
                  rotateTouch={false}
                  rotateXMax={30}
                  rotateYMax={30}
                  stretchX={45}
                  stretchY={45}
                  duration={200}
                  shadow={false}
                >
                  <ImageZoom
                    w='290px'
                    h='420px'
                    src={bookObject.image.url}
                    alt={`Imagen de "${bookObject.title}"`}
                    rounded='lg'
                    border='1px solid #A0AEC0'
                    boxShadow='lg'
                    decoding='async'
                    filter='blur(10px)'
                    transition='filter 0.5s ease-in-out'
                    onLoad={handleImageLoad}
                  />
                </Atropos>
              </LazyLoad>
            </Flex>
            <Image
              w='290px'
              h='420px'
              src={bookObject.image.url}
              position='absolute'
              bottom='710px'
              left='6px'
              opacity='50%'
              rounded='lg'
              decoding='async'
              filter='blur(10px)'
            />
            <Views
              justify='center'
              align='stretch'
              mt='6'
              left='0'
              right='0'
              position='absolute'
              views={bookObject.views}
              bxSize='5'
            />
            <Box
              w='290px'
              h='650px'
              overflowX='hidden'
              mt='14'
              p='0 1.25rem 0 0.90rem'
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
                w='270px'
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
                  <Center h='500px'>
                    <Spinner size='lg' />
                  </Center>
                }
              >
                <Flex direction='column' flexWrap='wrap'>
                  <Categories />
                </Flex>
              </Suspense>
              <Box
                w='270px'
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
