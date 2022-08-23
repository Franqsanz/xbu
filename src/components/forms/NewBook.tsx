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
import { useQuery, useMutation } from '@tanstack/react-query';
// import ImageUploading, { ImageListType } from "react-images-uploading";

import { categoryLinks } from '../links';
import { postBook } from '../../services/api';

export function NewBook() {
  const toast = useToast();
  // const [imageSrc, setImageSrc] = useState();
  // const [uploadData, setUploadData] = useState();
  // const [images, setImages] = useState([]);
  // const [image, setImage] = useState<File>();
  // const [preview, setPreview] = useState<string>();
  const [books, setBooks] = useState({
    title: '',
    description: '',
    publicationDate: '',
    author: '',
    category: '',
    numberPages: '',
    // imgUrl: new ArrayBuffer(0)
  });

  const disabled =
    !books.title ||
    !books.description ||
    !books.publicationDate ||
    !books.author ||
    !books.category ||
    !books.numberPages;

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

  const { mutate, isLoading, isSuccess, error } = useMutation(
    ['Books'],
    postBook,
  );

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
    // console.log(books);
    mutate(books);
  }

  return (
    <>
      <Flex
        align='center'
        justify='center'
        direction='column'
        p={{ base: 5, md: 20 }}
      >
        <Box
          w='full'
          boxShadow='2xl'
          p={{ base: 5, md: 10 }}
          rounded='xl'
          maxWidth='700px'
          border='1px'
          bg={useColorModeValue('white', 'grey.400')}
          borderColor='#2de000'
        >
          <Box mb='5' fontSize='3xl'>
            Publica tu libro favorito
          </Box>
          {isSuccess ? (
            <Alert status='success' m='30px 0 30px 0' rounded='xl'>
              <AlertIcon />
              <AlertTitle>Publicado Correctamente</AlertTitle>
            </Alert>
          ) : error ? (
            <Alert status='error' mb='10' rounded='xl'>
              <AlertIcon />
              <AlertTitle>Error al publicar</AlertTitle>
            </Alert>
          ) : (
            <Alert display='none' />
          )}
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
                  placeholder='Titulo'
                  name='title'
                  value={books.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
                <Textarea
                  id='descripcion'
                  mb='5'
                  name='description'
                  placeholder='Descripcion'
                  value={books.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='autor'>Autor</FormLabel>
                <Input
                  id='autor'
                  type='text'
                  mb='5'
                  placeholder='Autor'
                  name='author'
                  value={books.author}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box w='full' ml={{ base: 0, md: 5 }}>
              <FormControl isRequired>
                <FormLabel htmlFor='numeroPaginas'>Número de páginas</FormLabel>
                <Input
                  id='numeroPaginas'
                  type='number'
                  mb='5'
                  placeholder='Número de páginas'
                  name='numberPages'
                  value={books.numberPages}
                  onChange={handleChange}
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
                <FormLabel htmlFor='fecha'>Fecha de lanzamiento</FormLabel>
                <Input
                  id='fecha'
                  type='text'
                  mb='5'
                  name='publicationDate'
                  placeholder='Ingresar fecha'
                  value={books.publicationDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired mt={{ base: 0, md: 10 }}>
                <FormLabel htmlFor='categoria'>
                  Selecciona una categoria
                </FormLabel>
                <Select
                  id='categoria'
                  name='category'
                  value={books.category}
                  onChange={handleChange}
                  placeholder='Selecciona una categoria'
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
        </Box>
      </Flex>
    </>
  );
}
