import React from 'react';
import { Skeleton, Flex, HStack } from '@chakra-ui/react';

export function SkeletonTags() {
  const TagCategories = Array.from({ length: 8 }, (_, index) => (
    <Skeleton key={index} w='150px' h='30px' rounded='lg' />
  ));

  return (
    <>
      <Flex justify='center' overflow='hidden'>
        <HStack w='5xl' spacing='4' mt='5' mb='10' mx='10'>
          {TagCategories}
        </HStack>
      </Flex>
    </>
  );
}
