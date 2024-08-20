import React from 'react';
import { Flex } from '@chakra-ui/react';

export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        as='aside'
        display={{ base: 'none', xl: 'flex' }}
        w={{ base: '250px', lg: '300px' }}
        mr='8'
        direction='column'
      >
        {children}
      </Flex>
    </>
  );
}
