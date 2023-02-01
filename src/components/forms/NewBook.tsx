import React, { useState, useRef } from 'react';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Box,
  FormLabel,
  Textarea,
  Select,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { categoryLinks } from '../links';
import { Book } from '../types';
import { useMutatePost } from '../../hooks/querys';

export function FormNewBook() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading, isSuccess, error } = useMutatePost();
  const [cropData, setCropData] = useState('');
  const [crop, setCrop] = useState<any>();
  const [books, setBooks] = useState<Book>({
    title: '',
    author: '',
    synopsis: '',
    year: '',
    category: '',
    numberPages: '',
    sourceLink: '',
    language: '',
    format: '',
    image: {
      url: null,
      public_id: '',
    },
  });
  let previewImgUI;

  function allFieldsBook(book: Book): boolean {
    return Object.entries(book)
      .filter(([key]) => key !== 'sourceLink')
      .every(([, value]) => value);
  }

  const disabled = !allFieldsBook(books);

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1000000) {
      // 1 MB
      alert(
        `El tamaño de la imagen es demasiado grande. Por favor, seleccione una imagen de menor tamaño`,
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const base64Image = reader.result as string;
      setCropData(base64Image);
    };
    onOpen();
  }

  function getCropData() {
    if (typeof crop !== 'undefined') {
      setBooks({
        ...books,
        image: { url: crop.getCroppedCanvas().toDataURL(), public_id: '' },
      });
    }
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    mutate(books);
  }

  if (books.image) {
    if (books.image.url === null) {
      previewImgUI = (
        <Flex
          py='3'
          h='379px'
          m='auto'
          outline='1px dashed gray'
          rounded='lg'
          fontSize='sm'
          align='center'
          justify='center'
        >
          <Box px='3' textAlign='center'>
            <Box as='span'>
              Aquí verás una vista previa de la imagen recortada.
            </Box>
            <Box mt='1' fontSize='13px'>
              <Box as='span'>
                Solo se aceptan formatos PNG, JPG y WebP con un máximo de 1 MB.
              </Box>
            </Box>
          </Box>
        </Flex>
      );
    } else {
      previewImgUI = (
        <Box py='3' h='379px' outline='1px dashed gray' rounded='lg'>
          <Image
            h='360px'
            m='auto'
            rounded='lg'
            src={books.image.url || ''}
            alt='Preview'
          />
        </Box>
      );
    }
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
              <FormControl isRequired>
                <FormLabel htmlFor='sinopsis' mt='3'>
                  Subir Imagen
                </FormLabel>
                <Button
                  w='100%'
                  onClick={handleButtonClick}
                  fontWeight='500'
                  border='1px'
                  bg={useColorModeValue('#2de000', '#24b300')}
                  color='black'
                  _hover={{ bg: '#28c900' }}
                  _active={{ bg: '#28c900' }}
                >
                  <Flex align='center' justify='center'>
                    <Icon as={AiOutlineCloudUpload} fontSize='25' mr='2' />
                    Seleccionar una imagen
                  </Flex>
                </Button>
                <Input
                  accept='image/png, image/jpeg, image/webp'
                  display='none'
                  ref={fileInputRef}
                  type='file'
                  size='lg'
                  onChange={handleImageChange}
                />
              </FormControl>
              <Box my='3' mb='5'>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                  size={{ base: 'xs', md: 'lg' }}
                >
                  <ModalOverlay backdropFilter='blur(5px)' />
                  <ModalContent>
                    <ModalHeader fontSize='md'>
                      Recorta nueva imagen
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Cropper
                        style={{ width: '100%', height: 'auto' }}
                        zoomable={false}
                        aspectRatio={234 / 360}
                        preview='.img-preview'
                        src={cropData}
                        viewMode={2}
                        minCropBoxHeight={234}
                        minCropBoxWidth={360}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={false}
                        onInitialized={(instance) => setCrop(instance)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onClick={() => {
                          getCropData();
                          onClose();
                        }}
                        fontWeight='500'
                        border='1px'
                        bg={useColorModeValue('#2de000', '#24b300')}
                        color='black'
                        _hover={{ bg: '#28c900' }}
                        _active={{ bg: '#28c900' }}
                      >
                        Cortar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                {previewImgUI}
              </Box>
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
              <FormControl isRequired>
                <FormLabel htmlFor='año' mt={{ base: 0, md: '17.5' }}>
                  Año
                </FormLabel>
                <Input
                  id='año'
                  type='number'
                  mb={{ base: 5, md: 0 }}
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
                  <option value='Físico'>Físico</option>
                  <option value='Electrónico'>Electrónico</option>
                </Select>
              </FormControl>
              <Box mt={{ base: 10, md: 56 }}>
                <Button
                  type='submit'
                  w='full'
                  size='lg'
                  border='1px'
                  bg={useColorModeValue('#2de000', '#24b300')}
                  color='black'
                  _hover={{ bg: '#28c900' }}
                  _active={{ bg: '#28c900' }}
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
