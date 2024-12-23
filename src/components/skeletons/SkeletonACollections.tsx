import React from 'react';
import { Flex, Skeleton, Stack } from '@chakra-ui/react';

import { MyContainer } from '@components/ui/MyContainer';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';

export function SkeletonACollections() {
  const Cards = Array.from({ length: 6 }, (_, index) => (
    <Stack key={index} spacing='2' mb='10'>
      <Skeleton
        w={{ base: '150px', sm: '250px' }}
        h={{ base: '200px', sm: '210px' }}
        rounded='lg'
      ></Skeleton>
    </Stack>
  ));

  return (
    <>
      <Skeleton py={{ base: 16, md: '80px' }} />
      <Flex m='0 auto'>
        <Flex
          w={{ base: '1315px', '2xl': '1580px' }}
          mt='4'
          pb='4'
          px={{ base: '6', md: '20', sm: '10' }}
          justify='space-between'
          align='center'
        >
          <Skeleton w='120px' h='20px' />
          <Skeleton w={{ base: '40px', md: '150px' }} h='30px' rounded='lg' />
        </Flex>
      </Flex>
      <MyContainer>
        <MySimpleGrid>{Cards}</MySimpleGrid>
      </MyContainer>
    </>
  );
}
