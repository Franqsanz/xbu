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
  const bgColorBtn = useColorModeValue('green.500', 'green.700');

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
                  color='green.500'
                  mb='10'
                >
                  ¡Ups ha ocurrido un Error!
                </Box>
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
          <Suspense
            fallback={
              <Flex justify='center' my='40vh'>
                <Spinner size='xl' thickness='4px' speed='0.40s' />
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
