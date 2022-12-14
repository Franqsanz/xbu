import React, { useState } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Box,
  FormLabel,
  Textarea,
  Select,
  // Image,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  // RadioGroup,
  // Radio,
  // Stack,
} from '@chakra-ui/react';
// import { useQuery } from '@tanstack/react-query';
// import ImageUploading, { ImageListType } from "react-images-uploading";

import { categoryLinks } from '../links';
import { Book } from '../types';
import { useMutatePost } from '../../hooks/querys';

export function FormNewBook() {
  // const toast = useToast();
  // const [imageSrc, setImageSrc] = useState();
  // const [uploadData, setUploadData] = useState();
  // const [images, setImages] = useState([]);
  // const [image, setImage] = useState<File>();
  // const [preview, setPreview] = useState<string>();
  const [books, setBooks] = useState({
    title: '',
    author: '',
    synopsis: '',
    description: '',
    year: '',
    category: '',
    numberPages: '',
    sourceLink: '',
    language: '',
    format: '',
    // imgUrl: new ArrayBuffer(0)
  });

  function allFieldsBook(book: Book): boolean {
    return Object.entries(book)
      .filter(([key]) => key !== 'description' && key !== 'sourceLink')
      .every(([, value]) => value);
  }

  const disabled = !allFieldsBook(books);

  // const maxNumber = 69;

  // const onChange = (
  //   imageList: ImageListType,
  //   addUpdateIndex: number[] | undefined
  // ) => {
  //   setImages(imageList as never[]);
  // };

  // const { data } = useQuery(['Books'], async () => {
  //   const res = await fetch('https://xb-api.vercel.app/api');
  //   return res.json();
  // });

  const { mutate, isLoading, isSuccess, error } = useMutatePost();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setBooks({
      ...books,
      [e.target.name]: e.currentTarget.value,
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
        my='8'
        p={{ base: 3, md: 20 }}
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
          <Box mb='5' fontSize='md'>
            Los campos con el{' '}
            <Box display='inline' color='red.300'>
              *
            </Box>{' '}
            son obligatorios
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
                <FormLabel htmlFor='autor'>Autor</FormLabel>
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
              <FormControl isRequired>
                <FormLabel htmlFor='sinopsis'>Sinopsis</FormLabel>
                <Textarea
                  id='sinopsis'
                  rows={6}
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='synopsis'
                  placeholder='Sinopsis'
                  value={books.synopsis}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='descripcion' mt='2.5'>
                  Descripci??n{' '}
                  <Box display='inline' fontSize='xs'>
                    (Opcional)
                  </Box>
                </FormLabel>
                <Textarea
                  id='descripcion'
                  rows={10}
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='description'
                  placeholder='Puedes dejar una breve descripci??n (este campo es opcional)'
                  value={books.description}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
              </FormControl>
            </Box>
            <Box w='full' ml={{ base: 0, md: 5 }}>
              <FormControl>
                <FormLabel htmlFor='link'>
                  Adquirir libro{' '}
                  <Box display='inline' fontSize='xs'>
                    (Opcional)
                  </Box>
                </FormLabel>
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
                <FormLabel htmlFor='numeroPaginas'>N??mero de p??ginas</FormLabel>
                <Input
                  id='numeroPaginas'
                  type='number'
                  mb='5'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  placeholder='N??mero de p??ginas'
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
                <FormLabel htmlFor='a??o' mt={{ base: 0, md: '17.5' }}>
                  A??o
                </FormLabel>
                <Input
                  id='a??o'
                  type='number'
                  mb={{ base: 5, md: 0 }}
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  size='lg'
                  name='year'
                  placeholder='Ingresar a??o'
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
              <FormControl isRequired mt={{ base: 5, md: 8 }}>
                <FormLabel htmlFor='formato'>Formato</FormLabel>
                <Select
                  id='formato'
                  name='format'
                  size='lg'
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  value={books.format}
                  onChange={handleChange}
                  placeholder='Seleccione un Formato'
                  _focus={{ bg: 'transparent' }}
                >
                  <option value='F??sico'>F??sico</option>
                  <option value='Electr??nico'>Electr??nico</option>
                </Select>
              </FormControl>
              {/* <FormControl>
                <FormLabel htmlFor='formato' mt='18' mb='4'>
                  Formato
                </FormLabel>
                <RadioGroup onChange={handleChange as any} value={books.format}>
                  <Stack direction='row' spacing='5'>
                    <Radio
                      name='F??sico'
                      value='F??sico'
                      checked={books.format === 'F??sico'}
                      colorScheme='green'
                      size='lg'
                    >
                      F??sico
                    </Radio>
                    <Radio
                      name='Electr??nico'
                      value='Electr??nico'
                      checked={books.format === 'Electr??nico'}
                      colorScheme='green'
                      size='lg'
                    >
                      Electr??nico
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl> */}
              <Box mt={{ base: 10, md: 14 }}>
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
    </>
  );
}
