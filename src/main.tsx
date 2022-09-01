import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { GrPowerReset } from 'react-icons/gr';
import {
  ChakraProvider,
  ColorModeScript,
  Button,
  Spinner,
  Link,
  Flex,
  Box,
  VStack,
} from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { FormNewBook } from './pages/NewBook';
import { Home } from './pages/Home';
import { Explorer } from './pages/Explorer';
import { Categories } from './pages/Categories';
import { Category } from './pages/Category';
import { ErrorPage } from './pages/404';
import { Nav } from './components/nav/Nav';
import { Footer } from './components/Footer';

import theme from '../theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path='new-book' element={<FormNewBook />} />
          <Route path='explorer' element={<Explorer />} />
          <Route path='categories' element={<Categories />} />
          <Route
            path='categories/:param'
            element={
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <VStack
                        fontSize='2xl'
                        py='44'
                        h='85vh'
                        textAlign='center'
                      >
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
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
