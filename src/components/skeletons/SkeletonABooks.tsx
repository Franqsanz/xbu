import React from 'react';
import { Skeleton, Flex } from '@chakra-ui/react';

import { SkeletonTags } from '@components/skeletons/SkeletonTags';
import { SkeletonType } from '@components/types';
import { SkeletonContainer } from '@components/skeletons/SkeletonContainer';

export function SkeletonAllBooks({ showTags = true }: SkeletonType) {
  return (
    <>
      {showTags && (
        <>
          <Skeleton py={{ base: 14, md: 20 }} />
          <SkeletonTags />
          <Flex display={{ base: 'flex', xl: 'none' }}>
            <Skeleton w='full' h='50px' />
          </Flex>
        </>
      )}
      <SkeletonContainer />
    </>
  );
}
