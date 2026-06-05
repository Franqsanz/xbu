import React from 'react';
import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { SkeletonTags } from '@components/skeletons/SkeletonTags';
import { SkeletonGridCards } from '@components/skeletons/SkeletonGridCards';
import { Aside } from '@components/aside/Aside';
import { MyContainer } from '@components/ui/MyContainer';

export function FavoritesFallback() {
  return (
    <>
      <ContainerTitle title='Mis favoritos' />
      <SkeletonTags />
      <Flex display={{ base: 'flex', xl: 'none' }}>
        <Skeleton w='full' h='50px' />
      </Flex>
      <MyContainer>
        <Aside>
          <Box mt={{ base: '7', md: '52px' }}>
            <SkeletonText mt='1' noOfLines={2} spacing='2' skeletonHeight='5' />
          </Box>
        </Aside>
        <SkeletonGridCards />
      </MyContainer>
    </>
  );
}
