import {
  Avatar,
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { parseDate } from '@utils/utils';

type FeedActor = {
  uid: string;
  username: string;
  name: string;
  picture?: string;
};

type FeedBook = {
  id: string;
  title: string;
  pathUrl: string;
  image: { url: string };
  authors: string[];
  category: string[];
  synopsis: string;
};

export type FeedActivity = {
  type: 'book' | 'comment';
  createdAt: string;
  actor: FeedActor;
  book: FeedBook;
  comment?: { id: string; text: string };
};

type FeedItemProps = {
  activity: FeedActivity;
};

export function FeedItem({ activity }: FeedItemProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const commentBg = useColorModeValue('gray.50', 'gray.900');

  const { actor, book, type, comment, createdAt } = activity;
  const actionText = type === 'book' ? 'publicó un libro' : 'comentó en';
  const formattedDate = parseDate(createdAt, 'short') || '';

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
        <Link as={NavLink} to={`/profile/${actor.username}`}>
          <Avatar src={actor.picture} name={actor.name} size='sm' />
        </Link>
        <Flex direction='column' overflow='hidden' flex='1'>
          <Flex align='center' gap='2' flexWrap='wrap'>
            <Link
              as={NavLink}
              to={`/profile/${actor.username}`}
              fontWeight='semibold'
              _hover={{ textDecoration: 'underline' }}
            >
              {actor.name}
            </Link>
            <Text fontSize='sm' color={subTextColor}>
              {actionText}
            </Text>
          </Flex>
          <Text fontSize='xs' color={subTextColor}>
            {formattedDate}
          </Text>
        </Flex>
      </Flex>

      {type === 'comment' && comment && (
        <Box bg={commentBg} p='3' mb='4' rounded='md'>
          <Text fontSize='sm' whiteSpace='pre-wrap' noOfLines={4}>
            {comment.text}
          </Text>
        </Box>
      )}

      <Link
        as={NavLink}
        to={`/book/view/${book.pathUrl}`}
        _hover={{ textDecoration: 'none' }}
        display='block'
      >
        <Flex
          gap='4'
          p='3'
          border='1px'
          borderColor={borderColor}
          rounded='md'
          _hover={{ bg: commentBg }}
          transition='background 0.15s'
        >
          <Image
            src={book.image.url}
            alt={book.title}
            w={{ base: '70px', md: '90px' }}
            h={{ base: '105px', md: '135px' }}
            objectFit='cover'
            rounded='md'
            flexShrink={0}
            decoding='async'
            loading='lazy'
          />
          <Flex direction='column' justify='center' overflow='hidden' flex='1'>
            <Text fontSize='xs' color='green.500' textTransform='uppercase' mb='1'>
              {book.category[0]}
            </Text>
            <Text
              fontWeight='semibold'
              fontSize={{ base: 'md', md: 'lg' }}
              noOfLines={2}
            >
              {book.title}
            </Text>
            <Text fontSize='sm' color={subTextColor} noOfLines={1} mt='1'>
              {book.authors.join(', ')}
            </Text>
            {type === 'book' && (
              <Text fontSize='sm' color={subTextColor} noOfLines={2} mt='2'>
                {book.synopsis}
              </Text>
            )}
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
}
