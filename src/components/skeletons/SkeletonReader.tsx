import React from 'react';
import { Box, Flex, Skeleton, useColorModeValue } from '@chakra-ui/react';

export function ReaderBodySkeleton() {
  const docBg = useColorModeValue('gray.100', 'gray.900');
  const pillBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.700');
  return (
    <Flex flex='1' h='100%' bg={docBg} py='6' justify='center' position='relative'>
      <Skeleton
        h={{ base: '70vh', md: '80vh' }}
        w={{ base: '90%', md: '650px' }}
        maxW='900px'
        rounded='md'
      />
      <Box
        position='fixed'
        bottom='6'
        left='50%'
        transform='translateX(-50%)'
        bg={pillBg}
        rounded='full'
        px='4'
        py='2'
        boxShadow='lg'
      >
        <Flex align='center' gap='3'>
          <Skeleton w='28px' h='28px' rounded='full' />
          <Skeleton w='40px' h='14px' rounded='md' />
          <Skeleton w='28px' h='28px' rounded='full' />
        </Flex>
      </Box>
    </Flex>
  );
}

export function SkeletonReader() {
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <Flex direction='column' minH='100vh'>
      <Flex
        as='header'
        bg={headerBg}
        borderBottom='1px'
        borderColor={borderColor}
        px={{ base: 3, md: 5 }}
        py='3'
        align='center'
        gap='3'
      >
        <Skeleton w='32px' h='32px' rounded='md' />
        <Skeleton h='18px' w={{ base: '160px', md: '280px' }} rounded='md' />
      </Flex>
      <ReaderBodySkeleton />
    </Flex>
  );
}
