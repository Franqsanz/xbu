import React from 'react';
import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

import { SkeletonContainer } from '@components/skeletons/SkeletonContainer';

export function SkeletonProfile() {
  return (
    <>
      <Flex as='section' justify='center' direction='column' mt='7'>
        <SkeletonCircle size='100px' m='auto' />
        <Skeleton w='235px' h='25px' m='0 auto' mt='6' />
        <Skeleton w='180px' h='20px' m='0 auto' my='3' />
      </Flex>
      <SkeletonContainer />
    </>
  );
}
