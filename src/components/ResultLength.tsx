import React from 'react';
import { Box } from '@chakra-ui/react';

export function ResultLength({ data }: any) {
  return (
    <Box w='89%' m='auto' mt='10'>
      <Box p='2' fontSize='lg' textAlign={{ base: 'center', lg: 'left' }}>
        Total:{' '}
        <Box as='span' fontWeight='bold' fontFamily='arial'>
          {data.length}
        </Box>{' '}
        Libros
      </Box>
    </Box>
  );
}
