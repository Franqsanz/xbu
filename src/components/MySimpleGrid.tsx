import React from 'react';
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';

export function MySimpleGrid({ children }: { children: React.ReactNode }) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  return (
    <>
      <SimpleGrid
        maxW='full'
        w='8xl'
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        justifyItems='center'
        m='auto'
        mt={{ base: '10', sm: '20' }}
        px={{ base: 5, md: 10 }}
        color={colorCard}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
