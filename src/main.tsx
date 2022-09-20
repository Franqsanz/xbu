import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { NewBook } from './pages/NewBook';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Explorer } from './pages/Explorer';
import { Categories } from './pages/Categories';
import { Category } from './pages/Category';
import { Book } from './pages/Book';
import { ErrorPage } from './pages/404';
import { Nav } from './components/nav/Nav';
import { Footer } from './components/Footer';
import { CatchError } from './CatchError';

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
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='new-book' element={<NewBook />} />
          <Route path='explore' element={<Explorer />} />
          <Route path='categories' element={<Categories />} />
          <Route
            path='categories/:param'
            element={
              <CatchError>
                <Category />
              </CatchError>
            }
          />
          <Route
            path='book/:id'
            element={
              <CatchError>
                <Book />
              </CatchError>
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  // </React.StrictMode>
);
