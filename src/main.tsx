import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
          <Route path='categories/:param' element={<Category />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
