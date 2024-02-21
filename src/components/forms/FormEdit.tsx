import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  Button,
  Input,
  Flex,
  Box,
  FormLabel,
  Textarea,
  Image,
  useColorModeValue,
  useDisclosure,
  Icon,
  Skeleton,
  FormErrorMessage,
} from '@chakra-ui/react';
import pako from 'pako';
import { useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import 'cropperjs/dist/cropper.css';
import { AiOutlineSave } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { categories, formats, languages } from '../../data/links';
import { BookType } from '@components/types';
import { useUpdateBook } from '@hooks/querys';
import { ModalCropper } from '@components/modals/ModalCropper';
import { generatePathUrl, sortArrayByLabel } from '@utils/utils';
import { MyPopover } from '@components/MyPopover';
import { useMyToast } from '@hooks/useMyToast';
const Cropper = lazy(() => import('react-cropper'));

export function FormEdit({
  id,
  title,
  authors,
  synopsis,
  year,
  category,
  numberPages,
  sourceLink,
  language,
  format,
  pathUrl,
  image,
}: BookType) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookType>();
  const { url, public_id } = image;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const myToast = useMyToast();
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const bgColorButton = useColorModeValue('green.500', 'green.700');
  const [cropData, setCropData] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<Blob | MediaSource | null>(null);
  const [crop, setCrop] = useState<any>('');
  const [books, setBooks] = useState<BookType>({
    id,
    title,
    authors,
    synopsis,
    year,
    category,
    numberPages,
    sourceLink,
    language,
    format,
    pathUrl,
    image: {
      url,
      public_id,
    },
  });
  let previewImgUI;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isSuccess, error } = useUpdateBook(books);

  function allFieldsBook(book: BookType): boolean {
    return (
      Object.entries(book)
        .filter(([key]) => key !== 'sourceLink' && key !== 'pathUrl')
        .every(([, value]) => value) && book.category.length > 0
    );
  }

  const disabled = !allFieldsBook(books);

  const sortedCategories = sortArrayByLabel(categories);
  const sortedLanguage = sortArrayByLabel(languages);
  const sortedFormat = sortArrayByLabel(formats);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;

    // Si el campo es 'author', dividimos los nombres por comas en un array
    if (name === 'authors') {
      const authorNames = value.split(',');
      setBooks({
        ...books,
        [name]: authorNames, // Guardamos un array de nombres de autores
      });
    } else {
      setBooks({
        ...books,
        [name]: value,
      });
    }
  }

  function handleCategoryChange(selectedOptions) {
    // Verificar si se seleccionaron opciones
    if (selectedOptions && selectedOptions.length > 0) {
      // Obtener los valores de las opciones seleccionadas
      const selectedValues = selectedOptions.map((option) => option.value);

      // Actualizar el estado de 'books' con los valores seleccionados
      setBooks((prevBooks) => ({
        ...prevBooks,
        category: selectedValues,
      }));
    } else {
      // Si no se seleccionaron opciones, establecer el estado de 'category' como un array vacío
      setBooks((prevBooks) => ({
        ...prevBooks,
        category: [],
      }));
    }
  }

  function handleFieldChange(fieldName, newValue) {
    setBooks((books) => ({
      ...books,
      [fieldName]: newValue,
    }));
  }

  useEffect(() => {
    // Genera el pathUrl basado en el título cada vez que se actualiza
    const generatedPathUrl = generatePathUrl(books.title);
    setBooks((books) => ({ ...books, pathUrl: generatedPathUrl }));
  }, [books.title]);

  function handleButtonClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1 MB
    if (file.size > 1000000) {
      alert(
        `El tamaño de la imagen es mayor a 1 MB. Por favor, seleccione una imagen de menor tamaño.`,
      );

      return;
    }

    const blobImage = new Blob([file], { type: 'image/webp' });
    setCropData(URL.createObjectURL(blobImage));

    onOpen();
  }

  async function getCropData() {
    if (typeof crop !== 'undefined') {
      const croppedCanvas = crop.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        setPreviewImg(blob);

        if (blob) {
          const reader = new FileReader();
          reader.onload = function () {
            const arrayBuffer = reader.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const compressedArrayBuffer = pako.deflate(uint8Array);
            const byteArray = [...new Uint8Array(compressedArrayBuffer)];
            const publicId = books.image.public_id;
            const pId = publicId.replace('xbu/', '');

            setBooks((prevBooks) => ({
              ...prevBooks,
              image: {
                url: byteArray,
                public_id: pId,
              },
            }));
          };
          reader.readAsArrayBuffer(blob);

          onClose();
        }
      }, 'image/webp');
    }
  }

  function onSubmit() {
    mutate(books.id);
  }

  if (previewImg === null && !books.image?.url) {
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
  } else if (previewImg) {
    previewImgUI = (
      <Box py='3' h='379px' outline='1px dashed gray' rounded='lg'>
        <Image
          h='360px'
          m='auto'
          rounded='lg'
          src={previewImg ? URL.createObjectURL(previewImg) : ''}
          alt='Preview'
        />
      </Box>
    );
  } else if (books.image?.url) {
    previewImgUI = (
      <Box py='3' h='379px' outline='1px dashed gray' rounded='lg'>
        <Image
          h='360px'
          m='auto'
          rounded='lg'
          src={books.image?.url as string}
          alt='Preview'
        />
      </Box>
    );
  }

  if (isSuccess) {
    myToast({
      title: 'Guardado',
      description: 'Modificaciones guardadas exitosamente.',
      icon: FaCheckCircle,
      iconColor: 'green.700',
      bgColor: 'black',
    });

    navigate('/explore', { replace: true });
  } else if (error) {
    myToast({
      title: 'Ha ocurrido un error',
      description: 'No se ha podido guardar las modificaciones.',
      icon: IoWarningSharp,
      iconColor: 'red.400',
      bgColor: 'black',
    });
  }

  return (
    <>
      <Flex align='center' justify='center' direction='column'>
        <Box w='full' maxWidth='800px'>
          <Flex
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            justify='center'
            align='stretch'
            pb='3'
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box w='full' mr='5'>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor='titulo'>
                  Titulo{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Input
                  {...register('title', {
                    required: 'Titulo es obligatorio',
                  })}
                  id='titulo'
                  type='text'
                  mb='5'
                  bg={bgColorInput}
                  size={{ base: 'md', md: 'lg' }}
                  value={books.title}
                  name='title'
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.authors}>
                <Flex align='center' justify='space-between' mb='7px'>
                  <FormLabel htmlFor='autor'>
                    Autor(s){' '}
                    <Box display='inline' fontSize='sx' color='red.400'>
                      *
                    </Box>
                  </FormLabel>
                  <MyPopover
                    textBody='Aquí puedes ingresar el nombre de un autor/a o varios autores/as para un libro. Si son varios, asegúrate de separarlos por comas.'
                    textFooter='Por ejemplo: (ROSWITHA STARK,PETRA NEUMAYER)'
                  />
                </Flex>
                <Input
                  {...register('authors', {
                    required: 'Autor es obligatorio',
                  })}
                  id='autor'
                  type='text'
                  mb='5'
                  bg={bgColorInput}
                  size={{ base: 'md', md: 'lg' }}
                  value={books.authors}
                  name='authors'
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.authors && (
                  <FormErrorMessage>{errors.authors.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.synopsis}>
                <FormLabel htmlFor='sinopsis'>
                  Sinopsis{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Textarea
                  {...register('synopsis', {
                    required: 'Sinopsis es obligatorio',
                  })}
                  id='sinopsis'
                  rows={12}
                  mb='5'
                  bg={bgColorInput}
                  name='synopsis'
                  value={books.synopsis}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.synopsis && (
                  <FormErrorMessage>{errors.synopsis.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='sinopsis' mt='2'>
                  Subir Imagen
                </FormLabel>
                <Button
                  w='100%'
                  onClick={handleButtonClick}
                  fontWeight='500'
                  border='1px'
                  size='lg'
                  bg={bgColorButton}
                  color='black'
                  _hover={{ bg: 'green.600' }}
                  _active={{ bg: 'green.600' }}
                >
                  <Flex align='center' justify='center'>
                    <Icon as={BiImageAdd} fontSize='25' mr='2' />
                    Seleccionar una imagen
                  </Flex>
                </Button>
                <Input
                  accept='image/png, image/jpeg, image/jpg, image/webp'
                  display='none'
                  ref={fileInputRef}
                  type='file'
                  size='lg'
                  onChange={handleImageChange}
                />
              </FormControl>
              <Box my='5' mb='5'>
                <ModalCropper
                  isOpen={isOpen}
                  onClose={onClose}
                  getCropData={getCropData}
                >
                  <Suspense fallback={<Skeleton h='250px' />}>
                    {cropData === '' ? (
                      <Skeleton h='250px' />
                    ) : (
                      <Cropper
                        style={{ width: '100%', height: '300px' }}
                        zoomable={true}
                        aspectRatio={234 / 360}
                        preview='.img-preview'
                        src={cropData || undefined}
                        viewMode={2}
                        minCropBoxHeight={234}
                        minCropBoxWidth={360}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                        onInitialized={(instance) => setCrop(instance)}
                      />
                    )}
                  </Suspense>
                </ModalCropper>
                {previewImgUI}
              </Box>
            </Box>
            <Box w='full' ml={{ base: 0, md: 5 }}>
              <FormControl isInvalid={!!errors.sourceLink}>
                <Flex align='center' justify='space-between' mb='7px'>
                  <FormLabel htmlFor='link' m='0'>
                    Enlace de la librería{' '}
                    <Box display='inline' fontSize='xs'>
                      (Opcional)
                    </Box>
                  </FormLabel>
                  <MyPopover
                    textBody='Aquí puedes añadir un enlace para la compra del libro, por ejemplo:'
                    textFooter='https://www.buscalibre.com.ar/'
                  />
                </Flex>
                <Input
                  {...register('sourceLink', {
                    pattern: {
                      value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                      message: 'El enlace de la librería no es una URL válida',
                    },
                  })}
                  id='link'
                  type='text'
                  mb={{ base: 0, md: 5 }}
                  bg={bgColorInput}
                  size={{ base: 'md', md: 'lg' }}
                  name='sourceLink'
                  placeholder='https://ejemplo.com/'
                  value={books.sourceLink}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.sourceLink && (
                  <FormErrorMessage mb={{ base: 5, md: 0 }}>
                    {errors.sourceLink.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='language' mt={{ base: 5, md: 0 }} mb='15px'>
                  Idioma{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Select
                  id='languaje'
                  name='language'
                  size={{ base: 'md', md: 'lg' }}
                  variant='filled'
                  onChange={(selectedOption) =>
                    handleFieldChange('language', selectedOption?.value)
                  }
                  options={sortedLanguage}
                  value={{ value: books.language, label: books.language }}
                  noOptionsMessage={({ inputValue }) =>
                    `Esta opción "${inputValue}" no existe`
                  }
                  placeholder='Elija un Idioma'
                />
              </FormControl>
              <FormControl isInvalid={!!errors.numberPages} mt='5'>
                <FormLabel htmlFor='numeroPaginas'>
                  Número de páginas{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Input
                  {...register('numberPages', {
                    required: 'Número de páginas es obligatorio',
                    min: {
                      value: 49,
                      message: 'Número de páginas debe tener un  minimo de 49',
                    },
                  })}
                  id='numeroPaginas'
                  type='number'
                  mb={{ base: 0, md: 5 }}
                  bg={bgColorInput}
                  size={{ base: 'md', md: 'lg' }}
                  name='numberPages'
                  value={books.numberPages}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.numberPages && (
                  <FormErrorMessage mb={{ base: 5, md: 0 }}>
                    {errors.numberPages.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.year}>
                <FormLabel htmlFor='año' mt={{ base: 5, md: 0 }}>
                  Año{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Input
                  {...register('year', {
                    required: 'Año es obligatorio',
                    min: {
                      value: 1800,
                      message: 'Año no valido',
                    },
                    max: {
                      value: 2050,
                      message: 'Año no valido',
                    },
                  })}
                  id='año'
                  type='number'
                  mb={{ base: 0, md: 5 }}
                  bg={bgColorInput}
                  size={{ base: 'md', md: 'lg' }}
                  name='year'
                  value={books.year}
                  onChange={handleChange}
                  _focus={{ bg: 'transparent' }}
                />
                {errors.year && (
                  <FormErrorMessage mb={{ base: 5, md: 0 }}>
                    {errors.year.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={{ base: 5, md: 8 }}>
                <Flex align='center' justify='space-between' mb='9px'>
                  <FormLabel htmlFor='categoria' m='0'>
                    Categoria/Género{' '}
                    <Box display='inline' fontSize='sx' color='red.400'>
                      *
                    </Box>
                  </FormLabel>
                  <MyPopover textBody='Puedes añadir una categoría o varias' />
                </Flex>
                <Select
                  isMulti
                  id='categoria'
                  name='category'
                  size={{ base: 'md', md: 'lg' }}
                  variant='filled'
                  colorScheme='green'
                  onChange={handleCategoryChange}
                  options={sortedCategories}
                  value={books.category.map((category) => {
                    return { value: category, label: category };
                  })}
                  closeMenuOnSelect={false}
                  noOptionsMessage={({ inputValue }) =>
                    `Esta opción "${inputValue}" no existe`
                  }
                  placeholder='Elija una categoría'
                />
              </FormControl>
              <FormControl isInvalid={!!errors.format} mt={{ base: 5, md: 8 }}>
                <FormLabel htmlFor='formato'>
                  Formato{' '}
                  <Box display='inline' fontSize='sx' color='red.400'>
                    *
                  </Box>
                </FormLabel>
                <Select
                  id='formato'
                  name='format'
                  size={{ base: 'md', md: 'lg' }}
                  variant='filled'
                  onChange={(selectedOption) =>
                    handleFieldChange('format', selectedOption?.value)
                  }
                  options={sortedFormat}
                  value={{ value: books.format, label: books.format }}
                  noOptionsMessage={({ inputValue }) =>
                    `Esta opción "${inputValue}" no existe`
                  }
                  placeholder='Elija un Formato'
                />
              </FormControl>
              <Box
                // justify='space-evenly'
                // direction='column'
                // gap='4'
                mt={{ base: 10, md: '22rem' }}
              >
                <Button
                  type='submit'
                  w='full'
                  size='lg'
                  border='1px'
                  bg={bgColorButton}
                  color='black'
                  _hover={{ bg: 'green.600' }}
                  _active={{ bg: 'green.600' }}
                  isDisabled={disabled}
                  loadingText='Guardando...'
                  isLoading={isPending}
                >
                  <Flex align='center' justify='center'>
                    <Icon as={AiOutlineSave} fontSize='25' mr='2' />
                    Guardar
                  </Flex>
                </Button>
                {/* <Button
                    // w='full'
                    size='lg'
                    // border='1px'
                    // bg={bgColorButton}
                    // color='black'
                    // _hover={{ bg: 'green.600' }}
                    // _active={{ bg: 'green.600' }}
                >
                  <Flex align='center' justify='center'>
                    <Icon as={AiOutlineSave} fontSize='25' mr='2' />
                    Cancelar
                  </Flex>
                </Button> */}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
