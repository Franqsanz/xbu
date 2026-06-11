import {
  Avatar,
  Box,
  Flex,
  Icon,
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
  FiMessageSquare,
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
  const categoryColor = useColorModeValue('green.800', 'green.500');

  const {
    actor,
    book,
    type,
    comment,
    status,
    target,
    createdAt,
    rating,
    activities,
  } = activity;

  let actionText = '';
  if (type === 'book') actionText = 'publicó un libro';
  else if (type === 'comment') actionText = 'comentó en';
  else if (type === 'follow') actionText = 'siguió a';
  else if (type === 'rating') actionText = 'calificó';
  else if (type === 'group') actionText = 'interactuó con';

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
        <Box mb='4' pl='2'>
          <Text
            fontSize='sm'
            color={subTextColor}
            fontStyle='italic'
            whiteSpace='pre-wrap'
            noOfLines={4}
          >
            &ldquo;{comment.text}&rdquo;
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

      {book && type !== 'follow' && type !== 'group' && (
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
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                color={categoryColor}
                textTransform='uppercase'
                mb='1'
              >
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

      {type === 'group' && book && activities && (
        <GroupCard
          activities={activities}
          book={book}
          borderColor={borderColor}
          subTextColor={subTextColor}
          hoverBg={commentBg}
        />
      )}
    </Box>
  );
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

type GroupActionInfo = {
  icon: typeof FiCheck;
  color: string;
  label: string;
  comment?: string;
};

function getActionInfo(action: FeedActivity): GroupActionInfo | null {
  if (action.type === 'status' && action.status) {
    const m = STATUS_META[action.status];
    return {
      icon: m.icon,
      color: `${m.colorScheme}.500`,
      label: `Lo agregó a "${m.label}"`,
    };
  }
  if (action.type === 'rating' && typeof action.rating === 'number') {
    return {
      icon: FiStar,
      color: 'yellow.500',
      label: `Lo calificó con ${action.rating}/5`,
    };
  }
  if (action.type === 'comment' && action.comment) {
    return {
      icon: FiMessageSquare,
      color: 'gray.500',
      label: 'Comentó',
      comment: action.comment.text,
    };
  }
  if (action.type === 'favorite') {
    return { icon: FiHeart, color: 'red.500', label: 'Lo marcó como favorito' };
  }
  if (action.type === 'collection') {
    return {
      icon: FiBookmark,
      color: 'purple.500',
      label: 'Lo guardó en una colección',
    };
  }
  if (action.type === 'book') {
    return {
      icon: FiBookOpen,
      color: 'green.500',
      label: 'Publicó este libro',
    };
  }
  return null;
}

function GroupCard({
  activities,
  book,
  borderColor,
  subTextColor,
  hoverBg,
}: {
  activities: FeedActivity[];
  book: NonNullable<FeedActivity['book']>;
  borderColor: string;
  subTextColor: string;
  hoverBg: string;
}) {
  const categoryColor = useColorModeValue('green.800', 'green.500');
  const sorted = [...activities].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  const COMMENT_LIMIT = 3;
  const totalComments = sorted.filter((a) => a.type === 'comment').length;
  const extraComments = Math.max(0, totalComments - COMMENT_LIMIT);

  let commentCount = 0;
  const visible = sorted.filter((a) => {
    if (a.type !== 'comment') return true;
    commentCount += 1;
    return commentCount <= COMMENT_LIMIT;
  });

  return (
    <Link
      as={NavLink}
      to={`/book/view/${book.pathUrl}`}
      _hover={{ textDecoration: 'none' }}
      display='block'
    >
      <Flex
        direction='column'
        gap='4'
        p={{ base: 3, md: 4 }}
        border='1px'
        borderColor={borderColor}
        rounded='md'
        _hover={{ bg: hoverBg }}
        transition='background 0.15s'
      >
        <Flex gap='4'>
          <Image
            src={book.image.url}
            alt={book.title}
            w={{ base: '90px', md: '110px' }}
            h={{ base: '135px', md: '165px' }}
            objectFit='cover'
            rounded='md'
            flexShrink={0}
            decoding='async'
            loading='lazy'
          />
          <Flex direction='column' justify='center' overflow='hidden' flex='1'>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              color={categoryColor}
              textTransform='uppercase'
              mb='1'
            >
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
          </Flex>
        </Flex>
        <Box borderTop='1px solid' borderColor={borderColor} />
        <Box position='relative'>
          {visible.map((a, i) => {
            const info = getActionInfo(a);
            if (!info) return null;
            const isLast = i === visible.length - 1 && extraComments === 0;
            return (
              <Flex
                key={`${a.type}-${i}`}
                position='relative'
                pb={isLast ? '0' : '4'}
              >
                {!isLast && (
                  <Box
                    position='absolute'
                    left='5.5px'
                    top='16px'
                    bottom='-4px'
                    w='1px'
                    bg={borderColor}
                  />
                )}
                <Box
                  w='12px'
                  h='12px'
                  rounded='full'
                  bg='gray.400'
                  mt='4px'
                  flexShrink={0}
                  zIndex={1}
                />
                <Box ml='3' flex='1' overflow='hidden'>
                  <Flex align='center' gap='2' flexWrap='wrap'>
                    <Text fontSize='xs' color={subTextColor} fontFamily='mono'>
                      {formatTime(a.createdAt)}
                    </Text>
                    <Icon as={info.icon} color={info.color} boxSize='3.5' />
                    <Text fontSize='sm'>{info.label}</Text>
                  </Flex>
                  {info.comment && (
                    <Text
                      fontSize='sm'
                      color={subTextColor}
                      fontStyle='italic'
                      mt='1'
                      noOfLines={3}
                    >
                      &ldquo;{info.comment}&rdquo;
                    </Text>
                  )}
                </Box>
              </Flex>
            );
          })}
          {extraComments > 0 && (
            <Flex position='relative' pb='0'>
              <Box
                w='12px'
                h='12px'
                rounded='full'
                bg='gray.400'
                mt='4px'
                flexShrink={0}
                zIndex={1}
              />
              <Box ml='3' flex='1'>
                <Text fontSize='sm' color={subTextColor} fontStyle='italic'>
                  y {extraComments} comentario{extraComments > 1 ? 's' : ''} más…
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Link>
  );
}
