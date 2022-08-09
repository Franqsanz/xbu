import React, { useState, useEffect, useRef } from 'react'
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
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@tanstack/react-query'
// import ImageUploading, { ImageListType } from "react-images-uploading";

import { Nav } from '../components/Nav';
import { postBook } from '../services/api';

interface Items {
  id: string
  title: string,
  description: string,
  author: string,
  category: string,
  publicationDate: number,
  numberPages: number,
  // imgUrl: string
}

function App() {
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

  // const maxNumber = 69;

  // const onChange = (
  //   imageList: ImageListType,
  //   addUpdateIndex: number[] | undefined
  // ) => {
  //   setImages(imageList as never[]);
  // };

  const { data } = useQuery(['Books'], async () => {
    const res = await fetch('https://xb-api.vercel.app/api')
    return res.json()
  })

  const { mutate, isSuccess, error } = useMutation(['Books'], postBook);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setBooks({
      ...books,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    // console.log(books);
    mutate(books)
  }


  return (
    <>
      <Nav />
      <Flex
        align='center'
        justify='center'
        direction='column'
        p={{ base: 5, md: 20 }}
      >
        <Box
          w='full'
          boxShadow='2xl'
          p='10'
          rounded='xl'
          maxWidth='700px'
          border='1px'
          borderColor='#2de000'
        // direction={{ base: 'column', md: 'row' }}
        >
          <Heading as='h1' mb='5'>Publica tu libro favorito</Heading>
          {isSuccess ? (
            <Alert status='success' m='30px 0 30px 0' rounded='xl'>
              <AlertIcon />
              <AlertTitle>Publicado Correctamente</AlertTitle>
            </Alert>
          ) : (error ? (
            <Alert status='error' mb='10' rounded='xl'>
              <AlertIcon />
              <AlertTitle>Error al publicar</AlertTitle>
            </Alert>
          ) : (
            <Alert display='none' />
          )
          )}

          {/* {error && <Alert status='error' mb='10' rounded='xl'>
            <AlertIcon />
            <AlertTitle>Error al publicar</AlertTitle>
          </Alert>} */}
          <Flex
            as='form'
            onSubmit={handleSubmit}
            justify='center'
            align='stretch'
            // bg='orange'
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
                <FormLabel htmlFor='numeroPaginas'>Número de paginas</FormLabel>
                <Input
                  id='numeroPaginas'
                  type='number'
                  mb='5'
                  placeholder='Número de paginas'
                  name='numberPages'
                  value={books.numberPages}
                  onChange={handleChange}
                />
              </FormControl>
              {/*<FormControl isRequired>
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
              </FormControl>*/}
              <FormControl isRequired>
                <FormLabel htmlFor='fecha'>Año de publicación del libro</FormLabel>
                <Input
                  id='fecha'
                  type='number'
                  mb='5'
                  name='publicationDate'
                  placeholder='Ingresar fecha'
                  value={books.publicationDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired mt={{ base: 0, md: 10 }}>
                <FormLabel htmlFor='categoria'>Selecciona una categoria</FormLabel>
                <Select
                  id='categoria'
                  name='category'
                  value={books.category}
                  onChange={handleChange}
                  placeholder='Selecciona una categoria'
                >
                  <option value='ciencia ficcion'>ciencia ficcion</option>
                  <option value='terror'>terror</option>
                  <option value='suspenso'>suspenso</option>
                  <option value='economia'>economia</option>
                </Select>
              </FormControl>
              <Box mt='10'>
                <Button
                  type='submit'
                  w='full'
                  size='lg'
                  cursor='pointer'
                  bg='#2de000'
                  _hover={{
                    background: '#1f9b00',
                    // color: 'black',
                  }}
                // isDisabled={!users.user || !users.pass}
                // loadingText='Ingresando...'
                // isLoading={loading}
                >
                  Publicar
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
      {/* <Flex w='full' justify='center' p='10' m='auto' flexWrap='wrap'>
        {isLoading ? (
          <Spinner size='xl' />
        ) : (
          data.map(({ id, title, description, author, category, publicationDate, numberPages }: Items) => (
            <React.Fragment key={id}>
              <Box
                w='400px'
                m='2'
                rounded='lg'
                border='1px'
                borderColor='gray.200'
                overflow='hidden'
              >
                <Flex direction='column'>
                 <Box>
                    <Image src={imgUrl} alt='' />
                  </Box>
      <Box as='h1' fontSize='3xl' fontFamily='monospace' p='6' mb='4' bg='orange.400'>
        {title}
      </Box>
      <Box mb='2' p='7'>
        <Text noOfLines={10} lineHeight='1.6'>{description}</Text>
        <Box mb='5'>
          {author}
        </Box>
        <Box>
          Fecha de publicacion: {publicationDate}
        </Box>
        <Box>
          {category}
        </Box>
        <Box>
          paginas: {numberPages}
        </Box>
      </Box>
    </Flex>
              </Box >
            </React.Fragment >
          )))
}
      </Flex > */}
    </>
  )
}

export default App
