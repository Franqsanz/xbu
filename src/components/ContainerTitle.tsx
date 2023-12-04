import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';

import { TitleType } from './types';

export function ContainerTitle({ title }: TitleType) {
  const bgContainer = useColorModeValue('green.50', 'green.900');
  const colorTitle = useColorModeValue('green.900', 'green.50');

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
