import React from 'react';
import { Skeleton, SkeletonText, Flex, Box, Stack } from '@chakra-ui/react';

import { MySimpleGrid } from '../MySimpleGrid';
import { Aside } from '../Aside';
import { SkeletonTags } from './SkeletonTags';

interface SkeletonType {
  showTags?: boolean;
}

export function SkeletonAllBooks({ showTags = true }: SkeletonType) {
  const Cards = Array.from({ length: 12 }, (_, index) => (
    <Stack key={index} spacing='2' mb='10'>
      <Skeleton
        w={{ base: '120px', sm: '150px', md: '200px' }}
        h={{ base: '160px', sm: '200px', md: '300px' }}
        rounded='lg'
      ></Skeleton>
      <SkeletonText mt='1' noOfLines={2} spacing='2' skeletonHeight='4' />
    </Stack>
  ));

  return (
    <>
      {showTags && (
        <>
          <Skeleton py={{ base: 16, md: 20 }} />
          <SkeletonTags />
        </>
      )}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW='1900px'
        m='0 auto'
        px={{ base: 5, md: 10, '2xl': 16 }}
      >
        <Aside>
          <Box mt={{ base: '7', md: '97px' }}>
            <SkeletonText
              mt='1'
              noOfLines={2}
              spacing='2'
              skeletonHeight='5'
              mb='10'
            />
            <SkeletonText mt='1' noOfLines={4} spacing='2' skeletonHeight='3' />
          </Box>
        </Aside>
        <MySimpleGrid>{Cards}</MySimpleGrid>
      </Flex>
    </>
  );
}
