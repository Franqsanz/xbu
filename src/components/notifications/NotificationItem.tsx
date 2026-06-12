import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiMessageSquare,
  FiMoreHorizontal,
  FiStar,
  FiThumbsDown,
  FiThumbsUp,
  FiUserPlus,
} from 'react-icons/fi';

import { NotificationItem as NotificationItemType } from '@components/types';
import { formatRelativeTime } from '@utils/utils';

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
  onToggleRead?: (notification: NotificationItemType) => void;
  onDelete?: (notification: NotificationItemType) => void;
  compact?: boolean;
}

export function NotificationItem({
  notification,
  onClick,
  onToggleRead,
  onDelete,
  compact,
}: Props) {
  const navigate = useNavigate();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { text, to } = buildLabelAndLink(notification);
  const baseMeta = TYPE_META[notification.type];
  const meta =
    notification.type === 'reaction' && notification.reactionType === 'dislike'
      ? { icon: FiThumbsDown, color: 'red.500' }
      : baseMeta;
  const time = formatRelativeTime(notification.createdAt);
  const hasActions = !compact && (onToggleRead || onDelete);

  function handleRowClick() {
    onClick?.(notification);
    navigate(to);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
    }
  }

  return (
    <Flex
      role='button'
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      gap='3'
      align='flex-start'
      px={compact ? 3 : 4}
      py='3'
      borderBottomWidth='1px'
      borderColor={borderColor}
      sx={{ '&:last-of-type': { borderBottomWidth: 0 } }}
      _hover={{ bg: hoverBg }}
      cursor='pointer'
      transition='background 0.15s'
    >
      <Box position='relative' flexShrink={0}>
        <Avatar
          src={notification.actor?.picture}
          name={notification.actor?.name}
          size='md'
          boxSize={compact ? '32px' : { base: '40px', md: '48px' }}
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
        <NavLink to={to} onClick={(e) => e.stopPropagation()}>
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
        </NavLink>
      )}
      {!notification.read && (
        <Box w='8px' h='8px' rounded='full' bg='green.500' mt='2' flexShrink={0} />
      )}
      {hasActions && (
        <Menu placement='bottom-end' isLazy>
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiMoreHorizontal} />}
            aria-label='Opciones'
            size='sm'
            variant='ghost'
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList minW='180px'>
            {onToggleRead && (
              <MenuItem
                fontSize='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead(notification);
                }}
              >
                {notification.read ? 'Marcar como no leída' : 'Marcar como leída'}
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem
                fontSize='sm'
                color='red.500'
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification);
                }}
              >
                Eliminar
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
