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
import { FaRegBookmark } from 'react-icons/fa6';
import LazyLoad from 'react-lazy-load';
import Atropos from 'atropos/react';
import 'atropos/css';

import {
  useBook,
  useFavoriteBook,
  useDeleteBook,
  useCollectionsForUser,
} from '@hooks/queries';
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
import { ModalCollectionSelector } from '@components/modals/ModalCollectionSelector';
import { ModalForm } from '@components/modals/ModalForm';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';
import { Rating } from '@smastrom/react-rating';
import { Categories } from '@components/Categories';

const MoreBooksAuthors = lazy(() => import('@components/cards/MoreBooksAuthors'));
const RelatedBooks = lazy(() => import('@components/cards/RelatedBooks'));
const MoreBooks = lazy(() => import('@components/cards/MoreBooks'));

export default function Book() {
  const shareUrl = window.location.href;
  const { pathname } = useLocation();
  const getToken = window.localStorage.getItem('app_tk');
  const { pathUrl } = useParams();
  const { currentUser } = useAuth();
  const grayColor = useColorModeValue('gray.200', 'gray.600');
  const bgGrayCategory = useColorModeValue('gray.100', 'gray.700');
  const gradientColor = useColorModeValue('white', '#1A202C');
  const bgButton = useColorModeValue('white', 'black');
  const navigate = useNavigate();
  const myToast = useMyToast();
  const { data } = useBook(pathUrl, getToken);
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
  const {
    isOpen: isOpenCollectionSelector,
    onOpen: onOpenCollectionSelector,
    onClose: onCloseCollectionSelector,
  } = useDisclosure();
  let uiLink;
  let btnMoreOptions;
  let btnFavorite;
  let btnCollection;

  const {
    data: collections,
    refetch,
    isPending: isPendingCollections,
  } = useCollectionsForUser(currentUser?.uid, data.id);
  const [isFavorite, setIsFavorite] = useState<boolean>(data.isFavorite);
  const { mutate: mutateFavorite, isSuccess: successFavorite } = useFavoriteBook(
    data.id,
    isFavorite,
  );
  const {
    mutate: mutateDelete,
    isSuccess: successDelete,
    isPending,
  } = useDeleteBook();

  const isCurrentUserAuthor = currentUser && currentUser.uid === data.userId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
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
  }, [successFavorite]);

  useEffect(() => {
    setIsFavorite(data.isFavorite);
  }, [data.isFavorite, pathname]);

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

    btnCollection = (
      <Tooltip
        label='Agregar a una colección'
        fontSize='sm'
        bg='black'
        color='white'
      >
        <Button
          mt={{ base: 1, md: 5 }}
          size='sm'
          onClick={() => {
            refetch();
            onOpenCollectionSelector();
          }}
        >
          <Flex align='center' justify='center'>
            <Icon as={FaRegBookmark} boxSize={4} />
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
    return mutateDelete(data.id);
  }

  function handleGoBack() {
    return navigate(-1);
  }

  if (data.sourceLink === '') {
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
      <Flex
        as='section'
        w='full'
        maxW={{ base: '1165px', '2xl': '1430px' }}
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
          {btnCollection}
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
      <ModalCollectionSelector
        userId={currentUser?.uid}
        bookId={data.id}
        data={collections}
        isPending={isPendingCollections}
        isOpen={isOpenCollectionSelector}
        onClose={onCloseCollectionSelector}
      />
      <ModalConfirmation
        isOpen={isOpenConfirmation}
        title={data.title}
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
        id={data.id}
        title={data.title}
        authors={data.authors}
        synopsis={data.synopsis}
        year={data.year}
        category={data.category}
        numberPages={data.numberPages}
        sourceLink={data.sourceLink}
        language={data.language}
        format={data.format}
        image={{
          url: data.image.url,
          public_id: data.image.public_id,
        }}
        rating={data.rating}
        onClose={onCloseEdit}
      />
      <Flex
        as='section'
        w='full'
        maxW={{ base: '1190px', '2xl': '1470px' }}
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
          <Views
            justify='center'
            align='stretch'
            mt='6'
            left='0'
            right='0'
            position='absolute'
            views={data.views}
            bxSize='5'
          />
        </Box>
        <Flex
          w='full'
          maxW={{ base: '920px', '2xl': '1130px' }}
          direction='column'
          justify='center'
          px='5'
          m='auto'
          mt='1rem'
          mb='2'
        >
          <Box>
            <Link as={NavLink} to={`/books/filter/category/${data.category[0]}`}>
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
          <Flex
            my='1'
            fontSize={{ base: 'md', md: 'xl' }}
            textTransform='uppercase'
            flexWrap='wrap'
          >
            {data.authors.map((author, index) => (
              <MyLink
                external={false}
                key={index}
                href={`/books/filter/authors/${author}`}
                data={author}
                index={index !== data.authors.length - 1 && ','}
              />
            ))}
          </Flex>
          <Box mt='3'>
            <Rating style={{ maxWidth: 140 }} value={data.rating} readOnly />
          </Box>
          <Box mt='6'>
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
                <Flex mt='0' mb='2'>
                  <Box minW='160px'>
                    <Box as='span'>Año:</Box>
                  </Box>
                  <Box>
                    <Box as='span'>
                      <MyLink
                        external={false}
                        href={`/books/filter/year/${data.year}`}
                        data={data.year}
                      />
                    </Box>
                  </Box>
                </Flex>
                <Flex>
                  <Box minW='160px'>
                    <Box as='span'>N° páginas:</Box>
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
                        href={`/books/filter/language/${data.language}`}
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
                    <Flex flexWrap='wrap' as='span'>
                      {data.category.map((category, index) => (
                        <MyLink
                          external={false}
                          key={index}
                          href={`/books/filter/category/${category}`}
                          data={category}
                          index={index !== data.category.length - 1 && ','}
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
            data={data.title}
          />
          <BooksSection
            title='Más libros del autor'
            data={data.authors[0]}
            booksComponent={<MoreBooksAuthors id={data.id} />}
          />
          <BooksSection
            title='Libros relacionados con'
            data={data.category[0]}
            booksComponent={<RelatedBooks id={data.id} />}
          />
          <BooksSection
            title='Más libros en XBuniverse'
            booksComponent={<MoreBooks id={data.id} />}
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
                  <Box position='relative' data-atropos-offset='0'>
                    <ImageZoom
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
                    <Box
                      position='absolute'
                      top='8%'
                      left='15%'
                      width='25%'
                      height='70%'
                      background='linear-gradient(135deg, rgba(255, 255, 255, 0.446) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)'
                      borderRadius='lg'
                      pointerEvents='none'
                      data-atropos-offset='5'
                      opacity={0.8}
                    />
                  </Box>
                </Atropos>
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
            <Views
              justify='center'
              align='stretch'
              mt='6'
              left='0'
              right='0'
              position='absolute'
              views={data.views}
              bxSize='5'
            />
            <Box
              w={{ base: '290px', '2xl': '305px' }}
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
