import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './pages/App';
import { Home } from './pages/Home';
import { Explorer } from './pages/Explorer';
import { Categories } from './pages/Categories';
import { Footer } from './components/Footer';

import theme from '../theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Home />} />
            {/* <Route path=":id" element={<Home />} /> */}
            <Route path='new-book' element={<App />} />
            <Route path='explorer/' element={<Explorer />}>
              <Route path='categories/' element={<Categories />} />
            </Route>
            <Route path='*' element={404} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
