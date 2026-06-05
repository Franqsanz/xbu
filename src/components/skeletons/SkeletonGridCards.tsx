import React from 'react';
import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

import { MySimpleGrid } from '@components/ui/MySimpleGrid';

export function SkeletonGridCards() {
  const Cards = Array.from({ length: 12 }, (_, index) => (
    <Stack key={index} spacing='2' mb='10'>
      <Skeleton
        w={{ base: '120px', sm: '150px', md: '200px' }}
        h={{ base: '160px', sm: '200px', md: '300px' }}
        rounded='lg'
      />
      <SkeletonText mt='1' noOfLines={2} spacing='2' skeletonHeight='4' />
    </Stack>
  ));

  return <MySimpleGrid>{Cards}</MySimpleGrid>;
}
