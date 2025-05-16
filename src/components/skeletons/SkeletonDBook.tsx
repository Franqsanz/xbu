import React from 'react';
import { Skeleton, SkeletonText, Flex, Box } from '@chakra-ui/react';

export function SkeletonDetailsBook() {
  return (
    <>
      <Flex
        w='full'
        maxW={{ base: '1170px', '2xl': '1425px' }}
        m='auto'
        px={{ base: 5, xl: 0 }}
        pt='7'
        pb='5'
        align='center'
        justify='space-between'
      >
        <Skeleton w='100px' h='30px' rounded='lg'></Skeleton>
        <Flex gap='2'>
          <Skeleton w='40px' h='30px' rounded='lg'></Skeleton>
          <Skeleton w='40px' h='30px' rounded='lg'></Skeleton>
          <Skeleton w='40px' h='30px' rounded='lg'></Skeleton>
        </Flex>
      </Flex>
      <Flex
        w='full'
        maxW={{ base: '1170px', '2xl': '1440px' }}
        m='auto'
        mb='300px'
        align='flex-start'
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box m='auto' mt='5'>
          <Skeleton
            w={{ base: '230px', lg: '290px' }}
            h={{ base: '340px', lg: '420px' }}
            rounded='lg'
          ></Skeleton>
          <Skeleton
            display={{ base: 'none', lg: 'block' }}
            w='290px'
            h='600px'
            rounded='lg'
            mt='10'
          ></Skeleton>
        </Box>
        <Flex
          w='full'
          maxW={{ base: '920px', '2xl': '1120px' }}
          direction='column'
          justify='center'
          px='5'
          m='auto'
          mt='1rem'
          mb='2'
        >
          <Skeleton w='140px' h='30px' rounded='lg' mb='4' mt='1'></Skeleton>
          <SkeletonText
            w={{ base: '200px', lg: '600px' }}
            mb='5'
            noOfLines={2}
            spacing='3'
            skeletonHeight='10'
          />
          <Skeleton w='290px' h='20px' mb='5'></Skeleton>
          <Skeleton h='40px' rounded='lg' mb='3'></Skeleton>
          <SkeletonText mt='1' noOfLines={7} spacing='2' skeletonHeight='3' />
          <SkeletonText mt='8' noOfLines={5} spacing='2' skeletonHeight='3' />
          <SkeletonText mt='8' noOfLines={3} spacing='2' skeletonHeight='3' />
          <Skeleton h='300px' rounded='lg' mt='10'></Skeleton>
          <Flex direction={{ base: 'column', md: 'row' }} mt='10' gap='3'>
            <Skeleton
              w={{ base: 'full', lg: '150px' }}
              h='50px'
              rounded='lg'
            ></Skeleton>
            <Skeleton
              w={{ base: 'full', lg: '120px' }}
              h='50px'
              rounded='lg'
            ></Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
