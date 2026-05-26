import { NavLink, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

import { MainHead } from '@components/layout/Head';
import { Lost } from '@assets/assets';

export function ErrorBoundary() {
  const error = useRouteError();

  let title = '¡Algo salió mal!';
  let description =
    'Ocurrió un error inesperado. Probá recargar la página o volvé al inicio.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Página no encontrada';
      description = 'La página que estás buscando no existe o fue movida.';
    } else if (error.status >= 500) {
      title = 'Error del servidor';
      description =
        'No pudimos procesar tu solicitud. Intentalo de nuevo en un rato.';
    } else {
      title = `Error ${error.status}`;
      description = error.statusText || description;
    }
  }

  function handleReload() {
    window.location.reload();
  }

  return (
    <>
      <MainHead title='Error | XBuReads' />
      <VStack fontSize={{ base: 'lg', md: '2xl' }} py='20' minH='80vh' spacing='6'>
        <Box>
          <Image
            src={Lost}
            w={{ base: '200px', md: '380px' }}
            alt='Error'
            decoding='async'
          />
        </Box>
        <Text mt='3' fontWeight='semibold' textAlign='center' px='4'>
          {title}
        </Text>
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          textAlign='center'
          maxW='md'
          px='4'
          color='gray.500'
        >
          {description}
        </Text>
        <Flex gap='3' mt='2' direction={{ base: 'column', sm: 'row' }}>
          <Button
            onClick={handleReload}
            bg='green.500'
            color='black'
            fontWeight='normal'
            _hover={{ bg: 'green.600' }}
          >
            <Flex align='center' gap='2'>
              <Icon as={FiRefreshCw} />
              Recargar
            </Flex>
          </Button>
          <Link
            as={NavLink}
            to='/'
            border='1px'
            borderColor='green.500'
            borderRadius='md'
            px='4'
            py='2'
            fontSize='md'
            _hover={{ outline: 'none', bg: 'green.500', color: 'black' }}
          >
            <Flex align='center' gap='2'>
              <Icon as={FiArrowLeft} />
              Volver al inicio
            </Flex>
          </Link>
        </Flex>
      </VStack>
    </>
  );
}
