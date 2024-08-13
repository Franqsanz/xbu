import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export default extendTheme({
  colors: {
    green: {
      50: '#abf299',
      100: '#96ef7f',
      200: '#6ce94c',
      300: '#56e632',
      400: '#42e319',
      500: '#2de000',
      600: '#28c900',
      700: '#24b300',
      800: '#1f9c00',
      900: '#0d4300',
    },
  },
  styles: {
    global: {
      body: {
        '&::-webkit-scrollbar': {
          width: '17px',
          height: '7px',
          background: '#f2f2f2',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#a2aab3',
          borderRadius: '30px',
          border: '4px solid #f2f2f2',
        },
        '.medium-zoom-overlay, .medium-zoom--opened': {
          zIndex: 2,
        },
      },
      '#root': {
        display: { base: 'block', lg: 'flex' },
        flexDirection: 'column',
        minHeight: '100vh',
      },
      h1: {
        fontWeight: 'extrabold',
      },
      p: {
        fontWeight: '100',
      },
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
  },
  config,
});
