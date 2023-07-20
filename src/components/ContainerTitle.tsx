import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';

import { TitleProps } from './types';

export function ContainerTitle({ title }: TitleProps) {
  const bgContainer = useColorModeValue('#abf299', '#0d4300');
  const colorTitle = useColorModeValue('#0d4300', '#abf299');

  return (
    <Container maxW='full' p='0'>
      <Box py={{ base: 8, md: 10 }} bg={bgContainer}>
        <Box
          as='h1'
          m='auto'
          fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
          textAlign='center'
          color={colorTitle}
        >
          {title}
        </Box>
      </Box>
    </Container>
  );
}
