import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

function SkeletonFeedItem() {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={bg}
      border='1px'
      borderColor={borderColor}
      rounded='lg'
      p={{ base: 4, md: 5 }}
      mb='4'
    >
      <Flex align='center' gap='3' mb='4'>
        <SkeletonCircle size='8' flexShrink={0} />
        <Flex direction='column' gap='2' flex='1'>
          <Skeleton h='4' w='75%' />
          <Skeleton h='3' w='35%' />
        </Flex>
      </Flex>
      <Flex gap='4' p='3' border='1px' borderColor={borderColor} rounded='md'>
        <Skeleton
          w={{ base: '70px', md: '90px' }}
          h={{ base: '105px', md: '135px' }}
          rounded='md'
          flexShrink={0}
        />
        <Flex direction='column' gap='2' flex='1' justify='center'>
          <Skeleton h='3' w='35%' />
          <Skeleton h={{ base: '5', md: '6' }} w='95%' />
          <Skeleton h='4' w='70%' />
          <SkeletonText mt='2' noOfLines={2} spacing='2' skeletonHeight='3' />
        </Flex>
      </Flex>
    </Box>
  );
}

export function SkeletonFeed({ count = 4 }: { count?: number }) {
  return (
    <Box>
      <Skeleton h='8' w='130px' mb='6' />
      {Array.from({ length: count }, (_, i) => (
        <SkeletonFeedItem key={i} />
      ))}
    </Box>
  );
}
