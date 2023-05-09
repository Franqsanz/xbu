import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export default function ResultLength({ data }: any) {
  return (
    <Box mt={{ base: '7', md: '97px' }}>
      <Flex
        fontSize='lg'
        textAlign={{ base: 'center', lg: 'left' }}
        direction='column'
      >
        <Box as='span' fontSize='3xl' fontWeight='bold'>
          Libros
        </Box>
        {data.length} Resultados
      </Flex>
    </Box>
  );
}
