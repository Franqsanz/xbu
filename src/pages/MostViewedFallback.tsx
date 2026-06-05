import React from 'react';
import { Flex } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { SkeletonTags } from '@components/skeletons/SkeletonTags';
import { SkeletonGridCards } from '@components/skeletons/SkeletonGridCards';

export function MostViewedFallback() {
  return (
    <>
      <ContainerTitle title='Top 10 Más vistos' />
      <SkeletonTags />
      <Flex
        maxW={{ base: '1070px', '2xl': '1280px' }}
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <SkeletonGridCards />
      </Flex>
    </>
  );
}
