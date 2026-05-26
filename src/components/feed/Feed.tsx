import { useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight } from 'react-icons/fi';

import { useFeed } from '@hooks/queries';
import { FeedItem } from '@components/feed/FeedItem';
import { FeedActivity } from '@components/types';
import { SkeletonFeed } from '@components/skeletons/SkeletonFeed';
import { NoData } from '@assets/assets';

export function Feed() {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed();

  const activities = useMemo<FeedActivity[]>(
    () => data?.pages.flatMap((page: any) => page.activities) || [],
    [data],
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <SkeletonFeed />;
  }

  if (isError) {
    return (
      <Center py='20'>
        <Text color='red.500'>No se pudo cargar el feed.</Text>
      </Center>
    );
  }

  if (activities.length === 0) {
    return (
      <Flex direction='column' align='center' textAlign='center' py='10' gap='4'>
        <Image src={NoData} w={{ base: '200px', md: '300px' }} />
        <Heading fontSize={{ base: 'xl', md: '2xl' }}>Tu feed está vacío</Heading>
        <Text maxW='md' fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
          Seguí a otros lectores para ver acá los libros que publican y los
          comentarios que dejan.
        </Text>
        <Button
          as={NavLink}
          to='/explore'
          bg='green.500'
          color='black'
          fontWeight='normal'
          _hover={{ bg: 'green.600' }}
          mt='2'
        >
          <Flex align='center' gap='2'>
            Explorar libros
            <Icon as={FiArrowRight} />
          </Flex>
        </Button>
      </Flex>
    );
  }

  return (
    <Box>
      <Heading fontSize={{ base: 'xl', md: '2xl' }} mb='6' textAlign='left'>
        Tu feed
      </Heading>
      {activities.map((activity, index) => (
        <FeedItem
          key={`${activity.type}-${activity.comment?.id || activity.book.id}-${index}`}
          activity={activity}
        />
      ))}
      <Box ref={ref} py='4' textAlign='center'>
        {isFetchingNextPage && <Spinner size='md' />}
        {!hasNextPage && activities.length > 0 && (
          <Text fontSize='sm' color='gray.500'>
            No hay más actividad por ahora.
          </Text>
        )}
      </Box>
    </Box>
  );
}
