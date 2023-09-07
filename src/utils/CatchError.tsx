import React, { Suspense } from 'react';
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

import { PageNotFound, Lost } from '../assets/assets';
import { CatchErrorType } from '../components/types';
// import { noConnection } from '../utils/fetchData';

export function CatchError({ children, skeletonLoad }: CatchErrorType) {
  const bgColorBtn = useColorModeValue('green.500', 'green.700');
  // let notConnection;
  // let notFound;

  // if (noConnection) {
  //   notConnection = (
  //     <>
  //       <Image src={Lost} w={{ base: '200px', md: '400px' }} decoding='async' />
  //       <Text mt='5' pb='5' fontSize={{ base: 'lg', md: '2xl' }}>
  //         ¡Se ha perdido la conexión con el servidor!
  //       </Text>
  //     </>
  //   );
  // } else {
  //   notFound = (
  //     <>
  //       <Image
  //         src={PageNotFound}
  //         w={{ base: '200px', md: '400px' }}
  //         decoding='async'
  //       />
  //       <Text mt='5' pb='5' fontSize={{ base: 'lg', md: '2xl' }}>
  //         ¡Este libro no existe!
  //       </Text>
  //     </>
  //   );
  // }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <VStack py='24' minH='85vh' textAlign='center'>
              <Flex direction='column' p='5' align='center'>
                <Flex
                  w={{ base: '280px', md: '450px' }}
                  align='center'
                  direction='column'
                  mb='5'
                >
                  <Image
                    src={PageNotFound}
                    w={{ base: '200px', md: '300px' }}
                    decoding='async'
                  />
                  <Text mt='5' pb='5' fontSize={{ base: 'lg', md: '2xl' }}>
                    ¡Este libro no existe o se ha perdido la conexión con el
                    servidor!
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
                </Flex>
              </Flex>
            </VStack>
          )}
        >
          <Suspense fallback={skeletonLoad}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
