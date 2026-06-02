import {
  Avatar,
  Box,
  Flex,
  Image,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FiBookmark,
  FiBookOpen,
  FiCheck,
  FiHeart,
  FiStar,
  FiUserPlus,
} from 'react-icons/fi';
import { Rating } from '@smastrom/react-rating';

import { parseDate } from '@utils/utils';
import { FeedActivity, FeedItemProps } from '@components/types';

const STATUS_META: Record<
  NonNullable<FeedActivity['status']>,
  { label: string; icon: typeof FiCheck; colorScheme: string }
> = {
  read: { label: 'Leído', icon: FiCheck, colorScheme: 'green' },
  reading: { label: 'Leyendo', icon: FiBookOpen, colorScheme: 'blue' },
  want_to_read: {
    label: 'Quiere leer',
    icon: FiBookmark,
    colorScheme: 'yellow',
  },
};

const SIMPLE_BADGE: Partial<
  Record<
    FeedActivity['type'],
    { label: string; icon: typeof FiCheck; colorScheme: string }
  >
> = {
  favorite: { label: 'Favorito', icon: FiHeart, colorScheme: 'red' },
  collection: {
    label: 'Guardado en colección',
    icon: FiBookmark,
    colorScheme: 'purple',
  },
};

export function FeedItem({ activity }: FeedItemProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');
  const commentBg = useColorModeValue('gray.50', 'gray.900');

  const { actor, book, type, comment, status, target, createdAt, rating } = activity;

  let actionText = '';
  if (type === 'book') actionText = 'publicó un libro';
  else if (type === 'comment') actionText = 'comentó en';
  else if (type === 'follow') actionText = 'siguió a';
  else if (type === 'rating') actionText = 'calificó';

  const statusMeta = type === 'status' && status ? STATUS_META[status] : null;
  const simpleBadge = SIMPLE_BADGE[type];
  const ratingBadge =
    type === 'rating' && typeof rating === 'number'
      ? { label: `${rating}/5`, icon: FiStar, colorScheme: 'yellow' }
      : null;
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
            {actionText && (
              <Text fontSize='sm' color={subTextColor}>
                {actionText}
              </Text>
            )}
            {type === 'follow' && target && (
              <Link
                as={NavLink}
                to={`/profile/${target.username}`}
                fontWeight='semibold'
                _hover={{ textDecoration: 'underline' }}
              >
                {target.name}
              </Link>
            )}
            {statusMeta && (
              <Tag
                size='sm'
                colorScheme={statusMeta.colorScheme}
                variant='subtle'
                rounded='full'
              >
                <TagLeftIcon as={statusMeta.icon} />
                <TagLabel fontWeight='semibold'>{statusMeta.label}</TagLabel>
              </Tag>
            )}
            {simpleBadge && (
              <Tag
                size='sm'
                colorScheme={simpleBadge.colorScheme}
                variant='subtle'
                rounded='full'
              >
                <TagLeftIcon as={simpleBadge.icon} />
                <TagLabel fontWeight='semibold'>{simpleBadge.label}</TagLabel>
              </Tag>
            )}
            {ratingBadge && (
              <Tag
                size='sm'
                colorScheme={ratingBadge.colorScheme}
                variant='subtle'
                rounded='full'
              >
                <TagLeftIcon as={ratingBadge.icon} />
                <TagLabel fontWeight='semibold'>{ratingBadge.label}</TagLabel>
              </Tag>
            )}
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

      {type === 'follow' && target && (
        <Link
          as={NavLink}
          to={`/profile/${target.username}`}
          _hover={{ textDecoration: 'none' }}
          display='block'
        >
          <Flex
            gap='4'
            p='3'
            border='1px'
            borderColor={borderColor}
            rounded='md'
            align='center'
            _hover={{ bg: commentBg }}
            transition='background 0.15s'
          >
            <Avatar src={target.picture} name={target.name} size='md' />
            <Flex direction='column' overflow='hidden' flex='1'>
              <Text
                fontWeight='semibold'
                fontSize={{ base: 'md', md: 'lg' }}
                noOfLines={1}
              >
                {target.name}
              </Text>
              <Flex align='center' gap='1'>
                <Box as={FiUserPlus} color='green.500' />
                <Text fontSize='sm' color={subTextColor}>
                  Ver perfil
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      )}

      {book && type !== 'follow' && (
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
              {type === 'rating' && typeof rating === 'number' && (
                <Box mt='2'>
                  <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
                </Box>
              )}
            </Flex>
          </Flex>
        </Link>
      )}
    </Box>
  );
}
