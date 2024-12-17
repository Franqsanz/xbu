import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

import { SkeletonContainer } from './SkeletonContainer';

export function SkeletonDCollection() {
  return (
    <>
      <Skeleton py={{ base: 16, md: '80px' }} />
      <Flex m='0 auto'>
        <Flex
          w={{ base: '1300px', '2xl': '1580px' }}
          mt='4'
          pb='4'
          px={{ base: '6', md: '16', sm: '10' }}
          justify='space-between'
          align='center'
        >
          <Skeleton w='100px' h='30px' rounded='lg' />
          <Flex display={{ base: 'none', sm: 'flex' }} gap='3' mr='3'>
            <Skeleton w='140px' h='30px' rounded='lg' />
            <Skeleton w='150px' h='30px' rounded='lg' />
          </Flex>
          <Skeleton
            display={{ base: 'block', sm: 'none' }}
            w='32px'
            h='32px'
            rounded='lg'
          />
        </Flex>
      </Flex>
      <SkeletonContainer />
    </>
  );
}
