import React from 'react';
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';

export function MySimpleGrid({ children }: { children: React.ReactNode }) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  return (
    <>
      <SimpleGrid
        as='section'
        maxW='full'
        w='8xl'
        columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }}
        justifyItems='center'
        m='auto'
        mt={{ base: 10, sm: 20 }}
        pl={{ base: 0, md: 5 }}
        color={colorCard}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
