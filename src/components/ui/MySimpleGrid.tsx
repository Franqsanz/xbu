import React from 'react';
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';

interface SimpleGridType {
  width?: string;
  children: React.ReactNode;
}

export function MySimpleGrid({ width = '8xl', children }: SimpleGridType) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  return (
    <>
      <SimpleGrid
        as='section'
        maxW='full'
        w={width}
        columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }}
        justifyItems='center'
        m='auto'
        mt={{ base: 5, md: 12 }}
        pl={{ base: 0, md: 5 }}
        color={colorCard}
      >
        {children}
      </SimpleGrid>
    </>
  );
}
