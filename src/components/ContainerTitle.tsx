import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';

import { TitleProps } from './types';

export function ContainerTitle({ title }: TitleProps) {
  const bgContainer = useColorModeValue('#abf299', '#0d4300');
  const colorTitle = useColorModeValue('#0d4300', '#abf299');

  return (
    <Container maxW='full' p='0'>
      <Box py={{ base: 16, md: 24 }} bg={bgContainer}>
        <Box
          textAlign='center'
          as='h1'
          fontSize={{ base: '4xl', md: '7xl' }}
          color={colorTitle}
        >
          {title}
        </Box>
      </Box>
    </Container>
  );
}
