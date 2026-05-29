import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Flex,
  VStack,
  Link,
  useColorModeValue,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';

import { GrPowerReset } from 'react-icons/gr';
import { FiArrowLeft } from 'react-icons/fi';

import { PageNotFound, Lost } from '@assets/assets';
import { CatchErrorType } from '@components/types';
import { HttpError } from '@utils/fetchData';

type ErrorKind = 'not-found' | 'server' | 'network' | 'unknown';

function classifyError(error: unknown): ErrorKind {
  if (error instanceof HttpError) {
    if (error.status === 404) return 'not-found';
    if (error.status >= 500) return 'server';
    return 'unknown';
  }
  if (error instanceof Error && error.message === 'Failed to fetch') {
    return 'network';
  }
  return 'unknown';
}

const MESSAGES: Record<ErrorKind, { image: string; text: string }> = {
  'not-found': {
    image: PageNotFound,
    text: 'Este libro no existe o fue eliminado.',
  },
  server: {
    image: Lost,
    text: 'Tuvimos un problema en el servidor. Intentá de nuevo en un rato.',
  },
  network: {
    image: Lost,
    text: 'Se perdió la conexión. Revisá tu internet e intentá de nuevo.',
  },
  unknown: {
    image: Lost,
    text: 'Ocurrió un error inesperado al cargar la página.',
  },
};

export function CatchError({ children, skeletonLoad }: CatchErrorType) {
  const bgColorBtn = useColorModeValue('green.500', 'green.700');

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => {
            const kind = classifyError(error);
            const { image, text } = MESSAGES[kind];

            return (
              <VStack py='24' minH='85vh' textAlign='center'>
                <Flex direction='column' p='5' align='center'>
                  <Flex
                    w={{ base: '280px', md: '450px' }}
                    align='center'
                    direction='column'
                    mb='5'
                  >
                    <Image
                      src={image}
                      w={{ base: '200px', md: '300px' }}
                      decoding='async'
                    />
                    <Text mt='5' pb='5' fontSize={{ base: 'lg', md: '2xl' }}>
                      {text}
                    </Text>
                  </Flex>
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Link
                      as={NavLink}
                      to='/explore'
                      border='1px'
                      borderColor='green.500'
                      borderRadius='lg'
                      fontSize='xl'
                      p='3'
                      _hover={{
                        outline: 'none',
                        bg: 'green.500',
                        color: 'black',
                        borderColor: 'black',
                      }}
                    >
                      <Flex align='center' justify='center'>
                        <Icon as={FiArrowLeft} mr='2' />
                        Volver a explorar
                      </Flex>
                    </Link>
                    {kind !== 'not-found' && (
                      <Button
                        leftIcon={<GrPowerReset />}
                        size='lg'
                        bg={bgColorBtn}
                        color='black'
                        ml={{ base: 0, md: 5 }}
                        mt={{ base: 5, md: 0 }}
                        height='55px'
                        _hover={{ bg: 'green.600' }}
                        _active={{ bg: 'green.600' }}
                        onClick={() => resetErrorBoundary()}
                      >
                        Volver a Intentar
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </VStack>
            );
          }}
        >
          <Suspense fallback={skeletonLoad}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
