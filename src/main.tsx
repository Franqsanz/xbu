import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as Sentry from '@sentry/react';
import { HelmetProvider } from 'react-helmet-async';
import '@smastrom/react-rating/style.css';

import theme from '../theme';
import { routes } from './routes';
import { AuthProvider } from '@contexts/AuthContext';
// import { API_URL } from './config';

const queryClient = new QueryClient();

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  // tracePropagationTargets: [
  //   API_URL,
  //   /^\/api\//,
  // ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const html = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </HelmetProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(html);
