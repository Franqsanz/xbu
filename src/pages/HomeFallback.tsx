import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

import { useAuth } from '@contexts/AuthContext';
import { SkeletonFeed } from '@components/skeletons/SkeletonFeed';

export function HomeFallback() {
  const { userData } = useAuth();

  if (!userData) {
    return (
      <Box py={{ base: 10, md: '20vh' }} pt={{ base: 24, lg: 28, '2xl': 48 }}>
        <Flex direction='column' align='center' gap='4'>
          <Skeleton h={{ base: '60px', md: '110px', lg: '140px' }} w='320px' />
          <Box maxW='2xl' w='full' m='auto' px={{ base: 5, lg: 0 }}>
            <Skeleton h={{ base: '32px', lg: '48px' }} w='180px' mt='4' />
            <SkeletonText mt='4' noOfLines={2} spacing='3' skeletonHeight='3' />
            <Flex
              mt='12'
              gap='4'
              direction={{ base: 'column', lg: 'row' }}
              align='center'
            >
              <Skeleton h='48px' w={{ base: '250px', lg: '200px' }} rounded='lg' />
              <Skeleton h='48px' w={{ base: '250px', lg: '200px' }} rounded='lg' />
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      w='full'
      maxW='4xl'
      m='auto'
      px={{ base: 6, md: 6 }}
      py={{ base: 6, md: 10 }}
    >
      <SkeletonFeed />
    </Box>
  );
}
