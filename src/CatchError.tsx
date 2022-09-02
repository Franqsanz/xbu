import React, { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Flex, VStack, Link, Spinner } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { GrPowerReset } from 'react-icons/gr';

import { Category } from './pages/Category';

export function CatchError() {
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
                    ← Volver a explorar
                  </Link>
                  <Button
                    leftIcon={<GrPowerReset />}
                    size='lg'
                    bg='#26be00'
                    color='black'
                    ml={{ base: 0, md: 5 }}
                    mt={{ base: 5, md: 0 }}
                    height='55px'
                    _hover={{ bg: '#1f9b00' }}
                    _active={{ bg: '#1f9b00' }}
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
            <Category />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
