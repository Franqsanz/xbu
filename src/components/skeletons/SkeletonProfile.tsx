import React from 'react';
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

import { MyContainer } from '@components/ui/MyContainer';
import { Aside } from '@components/aside/Aside';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';

export function SkeletonProfile() {
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
      <Flex as='section' justify='center' direction='column' mt='7'>
        <SkeletonCircle size='100px' m='auto' />
        <Skeleton w='235px' h='25px' m='0 auto' mt='6' />
        <Skeleton w='180px' h='20px' m='0 auto' my='3' />
      </Flex>
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
