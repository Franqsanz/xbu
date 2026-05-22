import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useFollowers, useFollowing } from '@hooks/queries';

type FollowUser = {
  uid: string;
  username: string;
  name: string;
  picture: string;
};

type ModalFollowListProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  initialTab: 'followers' | 'following';
  followersCount: number;
  followingCount: number;
};

function FollowList({
  users,
  total,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  emptyText,
  onItemClick,
}: {
  users: FollowUser[];
  total: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  emptyText: string;
  onItemClick: () => void;
}) {
  const { ref, inView } = useInView();
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Center py='10'>
        <Spinner size='lg' />
      </Center>
    );
  }

  if (total === 0) {
    return (
      <Center py='10'>
        <Text fontStyle='italic' color='gray.500'>
          {emptyText}
        </Text>
      </Center>
    );
  }

  return (
    <Flex direction='column'>
      {users.map((user) => (
        <Flex
          key={user.uid}
          as={NavLink}
          to={`/profile/${user.username}`}
          onClick={onItemClick}
          align='center'
          gap={{ base: 2, md: 3 }}
          p={{ base: 2, md: 3 }}
          rounded='md'
          _hover={{ bg: hoverBg }}
        >
          <Avatar
            src={user.picture}
            name={user.name}
            size={{ base: 'sm', md: 'md' }}
          />
          <Flex direction='column' overflow='hidden'>
            <Text
              fontWeight='semibold'
              fontSize={{ base: 'sm', md: 'md' }}
              noOfLines={1}
            >
              {user.name}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray.500' noOfLines={1}>
              {user.username}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Box ref={ref} py='3' textAlign='center'>
        {isFetchingNextPage && <Spinner size='md' />}
      </Box>
    </Flex>
  );
}

export function ModalFollowList({
  isOpen,
  onClose,
  userId,
  initialTab,
  followersCount,
  followingCount,
}: ModalFollowListProps) {
  const [tabIndex, setTabIndex] = useState(initialTab === 'followers' ? 0 : 1);
  const bgColorBox = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    if (isOpen) {
      setTabIndex(initialTab === 'followers' ? 0 : 1);
    }
  }, [isOpen, initialTab]);

  const isFollowersTab = tabIndex === 0;

  const followersQuery = useFollowers(userId, isOpen && isFollowersTab);
  const followingQuery = useFollowing(userId, isOpen && !isFollowersTab);

  const followers = useMemo(
    () => followersQuery.data?.pages.flatMap((p) => p.followers) || [],
    [followersQuery.data],
  );
  const following = useMemo(
    () => followingQuery.data?.pages.flatMap((p) => p.following) || [],
    [followingQuery.data],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'xs', md: 'md' }}
      isCentered
    >
      <ModalOverlay backdropFilter='blur(7px)' />
      <ModalContent overflow='hidden' bg={bgColorBox}>
        <ModalHeader pb='2'>Conexiones</ModalHeader>
        <ModalCloseButton />
        <ModalBody p='0' pb='4'>
          <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            isFitted
            colorScheme='green'
            variant='line'
          >
            <TabList>
              <Tab fontSize='sm' fontWeight='normal'>
                Seguidores ({followersCount})
              </Tab>
              <Tab fontSize='sm' fontWeight='normal'>
                Siguiendo ({followingCount})
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel maxH='60vh' overflowY='auto' px='3'>
                <FollowList
                  users={followers}
                  total={followersCount}
                  isLoading={followersQuery.isLoading}
                  isFetchingNextPage={followersQuery.isFetchingNextPage}
                  hasNextPage={followersQuery.hasNextPage}
                  fetchNextPage={followersQuery.fetchNextPage}
                  emptyText='Aún no tiene seguidores'
                  onItemClick={onClose}
                />
              </TabPanel>
              <TabPanel maxH='60vh' overflowY='auto' px='3'>
                <FollowList
                  users={following}
                  total={followingCount}
                  isLoading={followingQuery.isLoading}
                  isFetchingNextPage={followingQuery.isFetchingNextPage}
                  hasNextPage={followingQuery.hasNextPage}
                  fetchNextPage={followingQuery.fetchNextPage}
                  emptyText='No sigue a nadie todavía'
                  onItemClick={onClose}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
