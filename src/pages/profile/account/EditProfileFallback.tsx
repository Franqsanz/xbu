import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

import { ContainerTitle } from '@components/layout/ContainerTitle';

export function EditProfileFallback() {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <ContainerTitle title='Editar perfil' />
      <Flex
        as='section'
        direction='column'
        w='full'
        maxW={{ base: 'full', md: '1000px' }}
        m='0 auto'
        px={{ base: 5, md: 10 }}
        py={{ base: 6, md: 10 }}
        gap='6'
      >
        <Skeleton h='28px' w='80px' rounded='md' alignSelf='flex-start' />
        <Flex
          direction='column'
          border='1px'
          borderColor={borderColor}
          rounded='lg'
          p={{ base: 4, md: 8 }}
          gap='8'
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 8, md: 12 }}
            align={{ base: 'stretch', md: 'flex-start' }}
          >
            <Flex
              direction='column'
              align='center'
              gap='4'
              w={{ base: 'full', md: '260px' }}
              flexShrink={0}
            >
              <Skeleton h='24px' w='60px' alignSelf='flex-start' />
              <SkeletonCircle size='128px' />
              <Skeleton h='36px' w='180px' rounded='md' />
            </Flex>
            <Flex direction='column' gap='5' flex='1' w='full'>
              <Box>
                <Skeleton h='16px' w='80px' mb='2' />
                <Skeleton h='40px' w='full' rounded='md' />
              </Box>
              <Box>
                <Skeleton h='16px' w='100px' mb='2' />
                <Skeleton h='40px' w='full' rounded='md' />
              </Box>
              <Box>
                <Skeleton h='16px' w='60px' mb='2' />
                <SkeletonText noOfLines={4} spacing='2' skeletonHeight='3' />
              </Box>
            </Flex>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} gap='3' justify='flex-end'>
            <Skeleton h='40px' w={{ base: 'full', md: '120px' }} rounded='md' />
            <Skeleton h='40px' w={{ base: 'full', md: '120px' }} rounded='md' />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
