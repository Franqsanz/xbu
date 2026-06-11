import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';

import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useUnreadNotificationsCount,
} from '@hooks/queries';
import { NotificationItem as NotificationItemView } from '@components/notifications/NotificationItem';
import type { NotificationItem as NotificationItemType } from '@components/types';

export function NotificationsBell() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data: countData } = useUnreadNotificationsCount();
  const { data, isLoading } = useNotifications(isOpen);
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const unreadCount = (countData as any)?.count ?? 0;

  const notifications: NotificationItemType[] = React.useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p: any) => p.notifications ?? []).slice(0, 8);
  }, [data]);

  function handleItemClick(notif: NotificationItemType) {
    if (!notif.read) markRead.mutate(notif.id);
    onClose();
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement='bottom-end'
      isLazy
    >
      <PopoverTrigger>
        <Box position='relative'>
          <IconButton
            aria-label='Notificaciones'
            icon={<Icon as={IoNotificationsOutline} boxSize='5' />}
            variant='ghost'
            size='sm'
            onClick={onToggle}
            _hover={{ color: 'green.500', bg: 'none' }}
            _active={{ bg: 'none' }}
          />
          {unreadCount > 0 && (
            <Flex
              position='absolute'
              top='-1px'
              right='-1px'
              bg='red.500'
              color='white'
              fontSize='2xs'
              fontWeight='bold'
              minW='18px'
              h='18px'
              px='1'
              rounded='full'
              align='center'
              justify='center'
              pointerEvents='none'
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Flex>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w={{ base: '320px', md: '380px' }} maxH='70vh'>
        <PopoverArrow />
        <PopoverHeader>
          <Flex justify='space-between' align='center'>
            <Text fontWeight='bold'>Notificaciones</Text>
            {unreadCount > 0 && (
              <Button
                variant='link'
                size='xs'
                colorScheme='gray'
                onClick={() => markAll.mutate()}
                isLoading={markAll.isPending}
              >
                Marcar todas como leídas
              </Button>
            )}
          </Flex>
        </PopoverHeader>
        <PopoverBody p='0' maxH='400px' overflowY='auto'>
          {isLoading && (
            <Flex justify='center' py='8'>
              <Spinner size='md' />
            </Flex>
          )}
          {!isLoading && notifications.length === 0 && (
            <Flex direction='column' align='center' py='10' px='4'>
              <Icon
                as={IoNotificationsOutline}
                boxSize='10'
                color={subColor}
                mb='3'
              />
              <Text fontSize='sm' color={subColor} textAlign='center'>
                No tenés notificaciones todavía.
              </Text>
            </Flex>
          )}
          {!isLoading &&
            notifications.map((n) => (
              <NotificationItemView
                key={n.id}
                notification={n}
                onClick={handleItemClick}
                compact
              />
            ))}
        </PopoverBody>
        <PopoverFooter textAlign='center'>
          <Link
            as={NavLink}
            to='/notifications'
            onClick={onClose}
            fontSize='sm'
            fontWeight='semibold'
            _hover={{ textDecoration: 'underline' }}
          >
            Ver todas
          </Link>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
