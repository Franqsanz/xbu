import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export default extendTheme({
  styles: {
    global: {
      body: {
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '7px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#CBD5E0',
          borderRadius: '30px',
        },
      },
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
  },
  config,
});
