import React from 'react';
import { Box } from '@chakra-ui/react';
import { Filter } from './forms/Filter';

export function ResultLength({ data }: any) {
  return (
    <Box w='85%' m='auto' mt='7'>
      <Filter />
      <Box fontSize='lg' textAlign={{ base: 'center', lg: 'left' }}>
        Total Libros:{' '}
        <Box as='span' fontWeight='bold' fontFamily='arial'>
          {data.length}
        </Box>
      </Box>
    </Box>
  );
}
