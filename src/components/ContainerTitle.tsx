import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';

import { TitleProps } from './types';

export function ContainerTitle({ title }: TitleProps) {
  return (
    <Container maxW='full' p='0'>
      <Box
        py={{ base: 16, md: 24 }}
        bg={useColorModeValue('#ecfccb', 'green.900')}
      >
        <Box
          textAlign='center'
          as='h1'
          fontSize={{ base: '4xl', md: '7xl' }}
          color={useColorModeValue('#4d7c0f', 'green.300')}
          fontWeight='normal'
        >
          {title}
        </Box>
      </Box>
    </Container>
  );
}
