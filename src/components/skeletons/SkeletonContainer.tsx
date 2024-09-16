import React from 'react';
import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

import { Aside } from '@components/aside/Aside';
import { MyContainer } from '@components/ui/MyContainer';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';

export function SkeletonContainer() {
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
      <MyContainer>
        <Aside>
          <Box mt={{ base: '7', md: '97px' }}>
            <SkeletonText
              mt='1'
              noOfLines={2}
              spacing='2'
              skeletonHeight='5'
              mb='10'
            />
            <SkeletonText
              mt='1'
              noOfLines={14}
              spacing='2'
              skeletonHeight='3'
              mb='10'
            />
            <SkeletonText mt='1' noOfLines={4} spacing='2' skeletonHeight='3' />
          </Box>
        </Aside>
        <MySimpleGrid>{Cards}</MySimpleGrid>
      </MyContainer>
    </>
  );
}
