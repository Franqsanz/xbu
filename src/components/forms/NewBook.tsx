import React, { useState } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Spinner,
  Box,
  Heading,
  FormLabel,
  Text,
  Textarea,
  Select,
  Image,
  HStack,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
// import ImageUploading, { ImageListType } from "react-images-uploading";

import { categoryLinks } from '../links';
import { useMutatePost } from '../../hooks/querys';
import { AllBooks } from '../AllBooks';

export function FormNewBook() {
  // const toast = useToast();
  // const [imageSrc, setImageSrc] = useState();
  // const [uploadData, setUploadData] = useState();
  // const [images, setImages] = useState([]);
  // const [image, setImage] = useState<File>();
  // const [preview, setPreview] = useState<string>();
  const [books, setBooks] = useState({
    title: '',
    description: '',
    year: '',
    author: '',
    category: '',
    numberPages: '',
    sourceLink: '',
    language: '',
    // imgUrl: new ArrayBuffer(0)
  });

  const disabled =
    !books.title ||
    !books.description ||
    !books.year ||
    !books.author ||
    !books.category ||
    !books.numberPages ||
    !books.sourceLink ||
    !books.language;

  // console.log(JSON.stringify(books) === '{}');
  // if (Object.values(books).length === 0) {
  //   console.log('vacio');
  // } else {
  //   console.log('no vacio');
  // }
  // Object.entries({ ...books }).some((d) => {
  //   console.log(d[1] === '');
  // });

  // const maxNumber = 69;

  // const onChange = (
  //   imageList: ImageListType,
  //   addUpdateIndex: number[] | undefined
  // ) => {
  //   setImages(imageList as never[]);
  // };

  const { data } = useQuery(['Books'], async () => {
    const res = await fetch('https://xb-api.vercel.app/api');
    return res.json();
  });

  const { mutate, isLoading, isSuccess, error } = useMutatePost();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setBooks({
      ...books,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    mutate(books);
  }

  return (
    <>
      <Flex
        align='center'
        justify='center'
        direction='column'
        p={{ base: 3, md: 20 }}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Box
          w='full'
          boxShadow='2xl'
          p={{ base: 5, md: 10 }}
          rounded='lg'
          maxWidth='900px'
          border='1px'
          bg={useColorModeValue('white', 'gray.900')}
          borderColor='#2de000'
        >
          <Box mb='5' fontSize='3xl'>
            Publica tu libro favorito
          </Box>
          <Flex
            as='form'
            onSubmit={handleSubmit}
            justify='center'
            align='stretch'
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box w='full' mr='5'>
              <FormControl isRequired>
                <FormLabel htmlFor='titulo'>Titulo</FormLabel>
                <Input
                  id='titulo'
                  type='text'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  placeholder='Titulo'
                  name='title'
                  value={books.title}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
                <Textarea
                  id='descripcion'
                  rows={10}
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='description'
                  placeholder='Descripcion'
                  value={books.description}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='autor' mt='15px'>
                  Autor
                </FormLabel>
                <Input
                  id='autor'
                  type='text'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  placeholder='Autor'
                  name='author'
                  value={books.author}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
            </Box>
            <Box w='full' ml={{ base: 0, md: 5 }}>
              <FormControl isRequired>
                <FormLabel htmlFor='link'>Adquirir libro</FormLabel>
                <Input
                  id='link'
                  type='text'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='sourceLink'
                  placeholder='https://ejemplo.com/'
                  value={books.sourceLink}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='language'>Idioma</FormLabel>
                <Input
                  id='language'
                  type='text'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  placeholder='Idioma'
                  name='language'
                  value={books.language}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='numeroPaginas'>Número de páginas</FormLabel>
                <Input
                  id='numeroPaginas'
                  type='number'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  placeholder='Número de páginas'
                  name='numberPages'
                  value={books.numberPages}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel htmlFor='imgUrl'>Subir imagen del Libro</FormLabel>
                 <ImageUploading
                  acceptType={['jpg', 'png']}
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                  }) => (
                    <Box mb='5'>
                      <Box>
                        <Button
                          w='full'
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Subir
                        </Button>
                      </Box>
                      {imageList.map((image, index) => (
                        <Box key={index} mt='12'>
                          <Image
                            w="full"
                            rounded='lg'
                            src={image.dataURL}
                            alt=""
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </ImageUploading>
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel htmlFor='año'>Año</FormLabel>
                <Input
                  id='año'
                  type='number'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='year'
                  placeholder='Ingresar año'
                  value={books.year}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl isRequired mt={{ base: 0, md: 8 }}>
                <FormLabel htmlFor='categoria'>Categoria del libro</FormLabel>
                <Select
                  id='categoria'
                  name='category'
                  size='lg'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  value={books.category}
                  onChange={handleChange}
                  placeholder='Seleccione una categoria'
                  _focus={{ bg: 'transparent' }}
                >
                  {categoryLinks.map(({ name }) => (
                    <option key={name}>{name}</option>
                  ))}
                </Select>
              </FormControl>
              <Box mt='10'>
                <Button
                  type='submit'
                  w='full'
                  size='lg'
                  bg='#26be00'
                  color='black'
                  _hover={{ bg: '#1f9b00' }}
                  _active={{ bg: '#1f9b00' }}
                  isDisabled={disabled}
                  loadingText='Publicando...'
                  isLoading={isLoading}
                >
                  Publicar
                </Button>
              </Box>
            </Box>
          </Flex>
          <Box mt='10'>
            {isSuccess ? (
              <Alert status='success' rounded='xl'>
                <AlertIcon />
                <AlertTitle fontWeight='normal'>
                  Publicado Correctamente
                </AlertTitle>
              </Alert>
            ) : error ? (
              <Alert status='error' rounded='xl'>
                <AlertIcon />
                <AlertTitle fontWeight='normal'>Error al publicar</AlertTitle>
              </Alert>
            ) : (
              <Alert display='none' />
            )}
          </Box>
        </Box>
      </Flex>
      <AllBooks />
    </>
  );
}
