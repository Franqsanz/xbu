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
          width: '17px',
          height: '7px',
          background: '#f2f2f2',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#a2aab3',
          borderRadius: '30px',
          border: '4px solid #f2f2f2',
        },
      },
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
  },
  config,
});
