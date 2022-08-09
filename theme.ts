import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export default extendTheme({
  // styles: {
  //   global: {
  //     body: {
  //       background: 'gray.50'
  //     }
  //   }
  // },
  config,
});