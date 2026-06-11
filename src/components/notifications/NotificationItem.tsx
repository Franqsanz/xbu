import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiMessageSquare,
  FiStar,
  FiThumbsDown,
  FiThumbsUp,
  FiUserPlus,
} from 'react-icons/fi';

import { NotificationItem as NotificationItemType } from '@components/types';
import { parseDate } from '@utils/utils';

const TYPE_META = {
  follow: { icon: FiUserPlus, color: 'green.500' },
  comment: { icon: FiMessageSquare, color: 'gray.500' },
  rating: { icon: FiStar, color: 'yellow.500' },
  reaction: { icon: FiThumbsUp, color: 'blue.500' },
} as const;

function buildLabelAndLink(notification: NotificationItemType) {
  const actorName = notification.actor?.name ?? 'Alguien';
  const bookTitle = notification.book?.title ?? 'tu libro';

  if (notification.type === 'follow') {
    return {
      text: `${actorName} te empezó a seguir`,
      to: notification.actor?.username
        ? `/profile/${notification.actor.username}`
        : '/',
    };
  }
  if (notification.type === 'comment') {
    return {
      text: `${actorName} comentó en "${bookTitle}"`,
      to: notification.book?.pathUrl
        ? `/book/view/${notification.book.pathUrl}`
        : '/',
    };
  }
  if (notification.type === 'rating') {
    return {
      text: `${actorName} calificó "${bookTitle}" con ${notification.rating}/5`,
      to: notification.book?.pathUrl
        ? `/book/view/${notification.book.pathUrl}`
        : '/',
    };
  }
  if (notification.type === 'reaction') {
    const verb = notification.reactionType === 'like' ? 'le gustó' : 'no le gustó';
    return {
      text: `A ${actorName} ${verb} tu comentario en "${bookTitle}"`,
      to: notification.book?.pathUrl
        ? `/book/view/${notification.book.pathUrl}`
        : '/',
    };
  }
  return { text: 'Nueva notificación', to: '/' };
}

interface Props {
  notification: NotificationItemType;
  onClick?: (notification: NotificationItemType) => void;
  compact?: boolean;
}

export function NotificationItem({ notification, onClick, compact }: Props) {
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { text, to } = buildLabelAndLink(notification);
  const baseMeta = TYPE_META[notification.type];
  const meta =
    notification.type === 'reaction' && notification.reactionType === 'dislike'
      ? { icon: FiThumbsDown, color: 'red.500' }
      : baseMeta;
  const time = parseDate(notification.createdAt, 'short');

  return (
    <Flex
      as={NavLink}
      to={to}
      onClick={() => onClick?.(notification)}
      gap='3'
      align='flex-start'
      px={compact ? 3 : 4}
      py='3'
      borderBottom={compact ? '1px solid' : undefined}
      borderColor={borderColor}
      _hover={{ bg: hoverBg, textDecoration: 'none' }}
      transition='background 0.15s'
    >
      <Box position='relative' flexShrink={0}>
        <Avatar
          src={notification.actor?.picture}
          name={notification.actor?.name}
          size={compact ? 'sm' : 'md'}
        />
        <Flex
          position='absolute'
          bottom='-2px'
          right='-2px'
          bg='white'
          border='2px solid white'
          rounded='full'
          align='center'
          justify='center'
          w='18px'
          h='18px'
        >
          <Icon as={meta.icon} color={meta.color} boxSize='3' />
        </Flex>
      </Box>
      <Flex direction='column' flex='1' overflow='hidden' gap='1'>
        <Text fontSize='sm' noOfLines={2}>
          {text}
        </Text>
        <Text fontSize='xs' color={subColor}>
          {time}
        </Text>
      </Flex>
      {notification.book?.image?.url && (
        <Image
          src={notification.book.image.url}
          alt={notification.book.title}
          w='36px'
          h='54px'
          objectFit='cover'
          rounded='sm'
          flexShrink={0}
          decoding='async'
          loading='lazy'
        />
      )}
      {!notification.read && (
        <Box w='8px' h='8px' rounded='full' bg='green.500' mt='2' flexShrink={0} />
      )}
    </Flex>
  );
}
