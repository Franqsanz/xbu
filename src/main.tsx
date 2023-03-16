import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { HelmetProvider } from 'react-helmet-async';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Categories } from './pages/Categories';
import { Category } from './pages/Category';
import { ErrorPage } from './pages/404';
import { Nav } from './components/nav/Nav';
import { Footer } from './components/Footer';
import { CatchError } from './CatchError';
import { ScrollToTop } from './ScrollToTop';

import theme from '../theme';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Book = lazy(() => import('./pages/Book'));
const Search = lazy(() => import('./pages/Search'));
const NewBook = lazy(() => import('./pages/NewBook'));

const queryClient = new QueryClient();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const html = (
  // <React.StrictMode>
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Nav />
          <ScrollToTop>
            <Suspense fallback='...'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='new-post' element={<NewBook />} />
                <Route path='explore' element={<Explore />} />
                <Route path='categories' element={<Categories />} />
                <Route
                  path='/books/categories/:param'
                  element={
                    <CatchError>
                      <Category />
                    </CatchError>
                  }
                />
                <Route
                  path='/books/search/:query/:param'
                  element={
                    <CatchError>
                      <Search />
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
            </Suspense>
          </ScrollToTop>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </HelmetProvider>
);
// </React.StrictMode>
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  html,
);
