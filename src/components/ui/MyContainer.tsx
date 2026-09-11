import React from 'react';
import { Flex } from '@chakra-ui/react';

import { CONTAINER_MAX_W, CONTAINER_PX } from '@components/ui/layout';

export function MyContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      as='article'
      w='full'
      direction={{ base: 'column', md: 'row' }}
      maxW={CONTAINER_MAX_W}
      m='0 auto'
      px={CONTAINER_PX}
    >
      {children}
    </Flex>
  );
}
