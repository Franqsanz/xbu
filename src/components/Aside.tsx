import React from 'react';
import { Flex } from '@chakra-ui/react';

export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        as='aside'
        display={{ base: 'none', xl: 'flex' }}
        w='300px'
        pr='2'
        direction='column'
      >
        {children}
      </Flex>
    </>
  );
}
