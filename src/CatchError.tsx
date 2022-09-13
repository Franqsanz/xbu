import React, { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Box,
  Button,
  Flex,
  VStack,
  Link,
  Spinner,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { GrPowerReset } from 'react-icons/gr';
import { FiArrowLeft } from 'react-icons/fi';

export function CatchError({ children }: { children: React.ReactNode }) {
  const bgColorBtn = useColorModeValue('#2de000', '#24b300');

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <VStack fontSize='2xl' py='44' h='85vh' textAlign='center'>
              <Flex direction='column' p='5' align='center'>
                <Box
                  as='h1'
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight='bold'
                  color='#2de000'
                  mb='10'
                >
                  Ups ha ocurrido un Error!
                </Box>
                <Flex direction={{ base: 'column', md: 'row' }}>
                  <Link
                    as={NavLink}
                    to='/explorer'
                    border='1px'
                    borderColor='#2de000'
                    borderRadius='lg'
                    fontSize='xl'
                    p='3'
                    _hover={{
                      outline: 'none',
                      bg: '#2de000',
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
                    _hover={{ bg: '#28c900' }}
                    _active={{ bg: '#28c900' }}
                    onClick={() => resetErrorBoundary()}
                  >
                    Volver a Intentar
                  </Button>
                </Flex>
              </Flex>
            </VStack>
          )}
        >
          <Suspense
            fallback={
              <Flex justify='center' my='64'>
                <Spinner size='xl' thickness='4px' speed='0.55s' />
              </Flex>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
