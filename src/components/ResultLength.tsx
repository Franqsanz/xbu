import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export function ResultLength({ data }: any) {
  return (
    <Box mt={{ base: '0', xl: '97px' }}>
      <Flex
        fontSize={{ base: 'sm', xl: 'lg', md: 'md' }}
        textAlign={{ base: 'center', lg: 'left' }}
        direction={{ base: 'row', xl: 'column' }}
        align='baseline'
      >
        <Box
          as='span'
          fontSize={{ base: 'xl', xl: '3xl' }}
          mr={{ base: '2', xl: 'none' }}
          fontWeight='bold'
        >
          Libros
        </Box>
        {data} Resultados
      </Flex>
    </Box>
  );
}
