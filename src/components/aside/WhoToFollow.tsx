import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

import {
  useFollowSuggestions,
  useFollowUser,
  useUnfollowUser,
} from '@hooks/queries';
import { SkeletonAsideBlock } from '@components/skeletons/SkeletonAside';
import { cldAvatar } from '@utils/images';

type SuggestedUser = {
  uid: string;
  username: string;
  name: string;
  picture?: string;
};

/** Cuántas sugerencias entran en el rail sin comerse el scroll. */
const MAX_ITEMS = 3;

/**
 * Alcanza para "Seguir" y "Siguiendo", que son los dos estados en reposo.
 * "Dejar de seguir" sólo aparece con el mouse encima y ahí el botón se estira,
 * igual que en el drawer de usuarios.
 */
const BUTTON_MIN_WIDTH = '80px';

function Suggestion({ user }: { user: SuggestedUser }) {
  // Optimista: el back ya no lo va a sugerir, pero la lista no se refetchea
  // hasta el próximo montaje y queremos feedback inmediato.
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { mutate: follow, isPending: followPending } = useFollowUser();
  const { mutate: unfollow, isPending: unfollowPending } = useUnfollowUser();
  const isPending = followPending || unfollowPending;

  function handleClick() {
    if (isPending) return;

    if (isFollowing) {
      setIsFollowing(false);
      unfollow(user.uid, { onError: () => setIsFollowing(true) });
    } else {
      setIsFollowing(true);
      follow(user.uid, { onError: () => setIsFollowing(false) });
    }
  }

  return (
    <Flex as='li' align='center' gap='2'>
      <Flex
        as={NavLink}
        to={`/profile/${user.username}`}
        align='center'
        gap='2'
        minW='0'
        flex='1'
        _hover={{ color: 'green.500', outline: 'none' }}
      >
        <Avatar src={cldAvatar(user.picture, 32)} name={user.name} size='sm' />
        <Flex direction='column' minW='0'>
          <Text fontSize='sm' fontWeight='semibold' noOfLines={1}>
            {user.name}
          </Text>
          <Text fontSize='xs' color='gray.500' noOfLines={1}>
            {user.username}
          </Text>
        </Flex>
      </Flex>
      <Button
        size='xs'
        minW={BUTTON_MIN_WIDTH}
        flexShrink={0}
        fontWeight='normal'
        bg={!isFollowing ? 'green.500' : isHovered ? 'red.500' : 'black'}
        color={!isFollowing ? 'black' : 'white'}
        _hover={{ bg: isFollowing ? 'red.500' : 'green.600' }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isLoading={isPending}
      >
        {isFollowing && isHovered
          ? 'Dejar de seguir'
          : isFollowing
            ? 'Siguiendo'
            : 'Seguir'}
      </Button>
    </Flex>
  );
}

export function WhoToFollow() {
  const { data, isLoading } = useFollowSuggestions(MAX_ITEMS);

  if (isLoading) {
    return <SkeletonAsideBlock rows={MAX_ITEMS} media='avatar' />;
  }

  const users: SuggestedUser[] = data?.suggestions || [];

  // Ya sigue a todo el mundo (o es el único usuario): no hay nada que sugerir.
  if (users.length === 0) return null;

  return (
    <Box>
      <Box fontSize='xl' fontWeight='bold'>
        A quién seguir
      </Box>
      <Flex as='ul' direction='column' mt='6' gap='3'>
        {users.map((user) => (
          <Suggestion key={user.uid} user={user} />
        ))}
      </Flex>
    </Box>
  );
}
