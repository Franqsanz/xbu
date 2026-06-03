import React from 'react';
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { Aside } from '@components/aside/Aside';
import { MyContainer } from '@components/ui/MyContainer';
import { MySimpleGrid } from '@components/ui/MySimpleGrid';

export function SkeletonProfile() {
  const bgCover = useColorModeValue('gray.100', 'gray.700');
  const Cards = Array.from({ length: 12 }, (_, index) => (
    <Stack key={index} spacing='2' mb='10'>
      <Skeleton
        w={{ base: '120px', sm: '150px', md: '200px' }}
        h={{ base: '160px', sm: '200px', md: '300px' }}
        rounded='lg'
      />
      <SkeletonText mt='1' noOfLines={2} spacing='2' skeletonHeight='4' />
    </Stack>
  ));
  return (
    <>
      <Flex
        as='section'
        justify='center'
        align='center'
        minH={{ base: '330px', md: '320px' }}
        py={{ base: 8, md: 10 }}
        bg={bgCover}
      >
        <Flex
          w='full'
          maxW={{ base: '1260px', '2xl': '1560px' }}
          m='0 auto'
          px={{ base: 5, md: 10, '2xl': 16 }}
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'flex-start' }}
          gap={{ base: 4, md: 8 }}
        >
          <Box
            display={{ base: 'none', xl: 'block' }}
            w={{ xl: '220px', '2xl': '260px' }}
            flexShrink={0}
          />
          <SkeletonCircle
            size={{ base: '90px', md: '140px' } as any}
            flexShrink={0}
          />
          <Flex
            direction='column'
            align={{ base: 'center', md: 'flex-start' }}
            gap='3'
            maxW={{ base: 'full', md: '400px', '2xl': '500px' }}
            minW={0}
            w='full'
          >
            <Skeleton h={{ base: '24px', md: '32px' }} w='260px' rounded='md' />
            <Skeleton h='18px' w='140px' rounded='md' />
            <Flex direction='column' gap='2' w='full'>
              <Skeleton h='14px' w='100%' rounded='md' />
              <Skeleton h='14px' w='80%' rounded='md' />
            </Flex>
            <Skeleton h='16px' w='220px' rounded='md' />
            <Skeleton h='16px' w='180px' rounded='md' />
            <Skeleton h='32px' w='220px' rounded='md' mt='2' />
            <Flex
              display={{ base: 'flex', md: 'none' }}
              wrap='wrap'
              justify='center'
              gap='2'
              mt='2'
            >
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} h='22px' w='80px' rounded='full' />
              ))}
            </Flex>
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml='auto'
            mr='10'
            gap={{ md: 8, '2xl': 20 }}
            alignSelf='stretch'
          >
            <Flex direction='column' gap='4' pl='8' flexShrink={0}>
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} h='20px' w='160px' rounded='md' />
              ))}
            </Flex>
            <Flex direction='column' gap='2' pl='8' flexShrink={0}>
              <Skeleton h='18px' w='140px' rounded='md' mb='1' />
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} h='16px' w='160px' rounded='md' />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex justify='center' my='3'>
        <Skeleton h='18px' w='140px' rounded='md' />
      </Flex>
      <MyContainer>
        <Aside>
          <Flex direction='column' gap='6' mt={{ base: '0', xl: '52px' }}>
            <Skeleton h='24px' w='140px' rounded='md' />
            <Box>
              <Skeleton h='12px' w='100px' rounded='md' mb='2' />
              <Skeleton h='28px' w='80px' rounded='md' />
            </Box>
            <Box>
              <Skeleton h='12px' w='120px' rounded='md' mb='2' />
              <Skeleton h='28px' w='100px' rounded='md' />
            </Box>
            <Box>
              <Skeleton h='12px' w='80px' rounded='md' mb='2' />
              <Skeleton h='18px' w='180px' rounded='md' />
            </Box>
          </Flex>
        </Aside>
        <MySimpleGrid>{Cards}</MySimpleGrid>
      </MyContainer>
    </>
  );
}
