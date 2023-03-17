import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Filter } from './forms/Filter';

export default function ResultLength({ data }: any) {
  return (
    <Box w='78%' m='auto' mt='7'>
      <Filter />
      <Flex
        fontSize='lg'
        textAlign={{ base: 'center', lg: 'left' }}
        direction='column'
      >
        <Box as='span' fontSize='3xl' fontWeight='bold' fontFamily='arial'>
          Libros
        </Box>
        {data.length} Resultados
      </Flex>
    </Box>
  );
}
