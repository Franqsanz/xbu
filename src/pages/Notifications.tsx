import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';
import { NotificationItem } from '@components/notifications/NotificationItem';
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useUnreadNotificationsCount,
} from '@hooks/queries';
import type { NotificationItem as NotificationItemType } from '@components/types';

export default function Notifications() {
  const { ref, inView } = useInView();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();
  const { data: countData } = useUnreadNotificationsCount();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const unreadCount = (countData as any)?.count ?? 0;

  const notifications: NotificationItemType[] = React.useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p: any) => p.notifications ?? []);
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleItemClick(notif: NotificationItemType) {
    if (!notif.read) markRead.mutate(notif.id);
  }

  return (
    <>
      <MainHead title='Notificaciones | XBuReads' />
      <ContainerTitle title='Notificaciones' />
      <Flex
        as='section'
        direction='column'
        w='full'
        maxW='800px'
        m='0 auto'
        px={{ base: 0, md: 5 }}
        py={{ base: 4, md: 8 }}
      >
        {unreadCount > 0 && (
          <Flex justify='flex-end' px={{ base: 4, md: 0 }} mb='4'>
            <Button
              size='sm'
              fontWeight='normal'
              onClick={() => markAll.mutate()}
              isLoading={markAll.isPending}
            >
              Marcar todas como leídas
            </Button>
          </Flex>
        )}

        <Box
          bg={bg}
          border='1px'
          borderColor={borderColor}
          rounded={{ base: 0, md: 'lg' }}
        >
          {isLoading && (
            <Flex justify='center' py='12'>
              <Spinner size='lg' />
            </Flex>
          )}

          {!isLoading && notifications.length === 0 && (
            <Flex direction='column' align='center' py='20' px='4'>
              <Icon
                as={IoNotificationsOutline}
                boxSize='14'
                color={subColor}
                mb='4'
              />
              <Text fontSize='lg' color={subColor} textAlign='center'>
                Todavía no tenés notificaciones
              </Text>
              <Text fontSize='sm' color={subColor} textAlign='center' mt='2'>
                Cuando alguien interactúe con tu perfil o tus libros, vas a verlo
                acá.
              </Text>
            </Flex>
          )}

          {!isLoading &&
            notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={handleItemClick}
              />
            ))}
        </Box>

        {hasNextPage && (
          <Box ref={ref} py='6' textAlign='center'>
            {isFetchingNextPage && <Spinner size='md' />}
          </Box>
        )}
      </Flex>
    </>
  );
}
