import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

export function ContainerRCard({ children }: { children: React.ReactNode }) {
  const colorCard = useColorModeValue('gray.900', 'gray.100');

  return (
    <>
      <Flex flexWrap={{ base: 'wrap', xl: 'nowrap' }} color={colorCard}>
        {children}
      </Flex>
    </>
  );
}
