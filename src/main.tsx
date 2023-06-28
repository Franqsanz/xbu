import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  ColorModeScript,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { HelmetProvider } from 'react-helmet-async';

import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/404';
import { Nav } from './components/nav/Nav';
import { Footer } from './components/Footer';
import { CatchError } from './utils/CatchError';
import { ScrollToTop } from './utils/ScrollToTop';

import theme from '../theme';

const PrivacyPolicies = lazy(() => import('./pages/PrivacyPolicies'));
const Explore = lazy(() => import('./pages/Explore'));
const Book = lazy(() => import('./pages/Book'));
const Search = lazy(() => import('./pages/Search'));
const NewBook = lazy(() => import('./pages/NewBook'));
const Profile = lazy(() => import('./pages/profile/Profile'));

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
            <Suspense
              fallback={
                <Stack spacing='4'>
                  <Skeleton py={{ base: 20, md: 36 }} />
                  <Skeleton h='100vh' />
                </Stack>
              }
            >
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='privacy-policies' element={<PrivacyPolicies />} />
                <Route path='new-post' element={<NewBook />} />
                <Route path='explore' element={<Explore />} />
                <Route path=':user' element={<Profile />} />
                <Route
                  path='/books/search/:query/:param'
                  element={
                    <CatchError>
                      <Search />
                    </CatchError>
                  }
                />
                <Route
                  path='/book/show/:pathUrl'
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
  // </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  html,
);
