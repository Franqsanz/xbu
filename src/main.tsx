import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import '@smastrom/react-rating/style.css';

import theme from '../theme';
import { routes } from './routes';
import { AuthProvider } from '@contexts/AuthContext';
import { queryClient } from './config';
import { initMonitoring } from '@utils/monitoring';
// import { initializeAuth } from '@utils/authSetup';

// Inicializa los mecanismos de autenticación
// initializeAuth();

// Los devtools se importaban siempre y viajaban en el bundle de producción.
// Con `import.meta.env.DEV` (constante en build) rollup elimina la rama entera.
const Devtools = import.meta.env.DEV
  ? React.lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )
  : null;

const html = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ChakraProvider>
      {Devtools && (
        <React.Suspense fallback={null}>
          <Devtools />
        </React.Suspense>
      )}
    </QueryClientProvider>
  </HelmetProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(html);

initMonitoring();
