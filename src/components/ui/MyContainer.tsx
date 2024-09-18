import React from 'react';
import { Flex } from '@chakra-ui/react';

export function MyContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        as='article'
        w='full'
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: '1260px', '2xl': '1560px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        {children}
      </Flex>
    </>
  );
}
