import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Tab,
  TabList,
  Tabs,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';

import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MainHead } from '@components/layout/Head';
import { NotificationItem } from '@components/notifications/NotificationItem';
import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useToggleNotificationRead,
  useUnreadNotificationsCount,
} from '@hooks/queries';
import type { NotificationItem as NotificationItemType } from '@components/types';

type TypeFilter = 'all' | NotificationItemType['type'];

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'follow', label: 'Seguidores' },
  { key: 'comment', label: 'Comentarios' },
  { key: 'reply', label: 'Respuestas' },
  { key: 'rating', label: 'Calificaciones' },
  { key: 'reaction', label: 'Reacciones' },
];

function NotificationSkeleton() {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  return (
    <Flex
      gap='3'
      align='flex-start'
      px='4'
      py='3'
      borderBottomWidth='1px'
      borderColor={borderColor}
      sx={{ '&:last-of-type': { borderBottomWidth: 0 } }}
    >
      <SkeletonCircle boxSize={{ base: '40px', md: '48px' }} flexShrink={0} />
      <Flex direction='column' flex='1' gap='2' overflow='hidden'>
        <SkeletonText noOfLines={2} spacing='2' skeletonHeight='3' />
        <Skeleton h='10px' w='80px' />
      </Flex>
      <Skeleton w='36px' h='54px' rounded='sm' flexShrink={0} />
    </Flex>
  );
}

export default function Notifications() {
  const { ref, inView } = useInView();
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('white', 'gray.800');
  const filterActiveBg = 'green.50';
  const filterActiveColor = 'green.900';
  const filterBg = useColorModeValue('gray.100', 'gray.700');
  const filterColor = useColorModeValue('gray.700', 'gray.200');

  const [tabIndex, setTabIndex] = useState(0); // 0 = todas, 1 = no leídas, 2 = leídas
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();
  const { data: countData } = useUnreadNotificationsCount();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const toggleRead = useToggleNotificationRead();
  const deleteNotif = useDeleteNotification();
  const unreadCount = (countData as any)?.count ?? 0;

  const allNotifications: NotificationItemType[] = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((p: any) => p.notifications ?? []);
  }, [data]);

  const notifications = useMemo(() => {
    return allNotifications
      .filter((n) => {
        if (tabIndex === 1) return !n.read;
        if (tabIndex === 2) return n.read;
        return true;
      })
      .filter((n) => (typeFilter === 'all' ? true : n.type === typeFilter));
  }, [allNotifications, tabIndex, typeFilter]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleItemClick(notif: NotificationItemType) {
    if (!notif.read) markRead.mutate(notif.id);
  }

  function handleToggleRead(notif: NotificationItemType) {
    toggleRead.mutate({ id: notif.id, read: !notif.read });
  }

  function handleDelete(notif: NotificationItemType) {
    deleteNotif.mutate(notif.id);
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
        px={{ base: 5, md: 5 }}
        py={{ base: 5, md: 8 }}
        gap='4'
      >
        <Tabs
          index={tabIndex}
          onChange={setTabIndex}
          variant='line'
          colorScheme='green'
          size='sm'
        >
          <TabList>
            <Tab fontSize='sm'>Todas</Tab>
            <Tab fontSize='sm'>
              No leídas{unreadCount > 0 ? ` (${unreadCount})` : ''}
            </Tab>
            <Tab fontSize='sm'>Leídas</Tab>
          </TabList>
        </Tabs>

        <Flex
          gap='2'
          overflowX='auto'
          flexWrap={{ base: 'nowrap', md: 'wrap' }}
          mx={{ base: -5, md: 0 }}
          px={{ base: 5, md: 0 }}
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {TYPE_FILTERS.map((f) => {
            const active = typeFilter === f.key;
            return (
              <Tag
                key={f.key}
                as='button'
                size='md'
                rounded='full'
                cursor='pointer'
                flexShrink={0}
                bg={active ? filterActiveBg : filterBg}
                color={active ? filterActiveColor : filterColor}
                border='1px solid'
                borderColor={active ? filterActiveBg : 'transparent'}
                onClick={() => setTypeFilter(f.key)}
              >
                <TagLabel>{f.label}</TagLabel>
              </Tag>
            );
          })}
        </Flex>

        {unreadCount > 0 && (
          <Flex justify='flex-end'>
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

        {isLoading ? (
          <Box>
            {Array.from({ length: 5 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))}
          </Box>
        ) : (
          <Box
            bg={bg}
            border='1px'
            borderColor={borderColor}
            rounded='lg'
            overflow='hidden'
          >
            {notifications.length === 0 ? (
              <Flex direction='column' align='center' py='20' px='4'>
                <Icon
                  as={IoNotificationsOutline}
                  boxSize='14'
                  color={subColor}
                  mb='4'
                />
                <Text fontSize='lg' color={subColor} textAlign='center'>
                  {tabIndex !== 0 || typeFilter !== 'all'
                    ? 'No hay notificaciones en este filtro'
                    : 'Todavía no tenés notificaciones'}
                </Text>
                {tabIndex === 0 && typeFilter === 'all' && (
                  <Text fontSize='sm' color={subColor} textAlign='center' mt='2'>
                    Cuando alguien interactúe con tu perfil o tus libros, vas a verlo
                    acá.
                  </Text>
                )}
              </Flex>
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onClick={handleItemClick}
                  onToggleRead={handleToggleRead}
                  onDelete={handleDelete}
                />
              ))
            )}
          </Box>
        )}

        {hasNextPage && (
          <Box ref={ref} py='6' textAlign='center'>
            {isFetchingNextPage && <Spinner size='md' />}
          </Box>
        )}
      </Flex>
    </>
  );
}
