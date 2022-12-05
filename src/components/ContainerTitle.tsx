import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';

import { TitleProps } from './types';

export function ContainerTitle({ title }: TitleProps) {
  return (
    <Container maxW='full' p='0'>
      <Box
        py={{ base: 16, md: 24 }}
        bg={useColorModeValue('#abf299', '#0d4300')}
      >
        <Box
          textAlign='center'
          as='h1'
          fontSize={{ base: '4xl', md: '7xl' }}
          color={useColorModeValue('#0d4300', '#abf299')}
          fontWeight='normal'
        >
          {title}
        </Box>
      </Box>
    </Container>
  );
}
