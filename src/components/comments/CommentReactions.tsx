import { Button, Flex, Icon } from '@chakra-ui/react';
import { BiLike, BiDislike } from 'react-icons/bi';
import type { ReactNode } from 'react';

import { ReactionsType } from '@components/types';

type Props = ReactionsType & { extras?: ReactNode };

export function CommentReactions({
  likesCount,
  dislikesCount,
  onLike,
  onDislike,
  extras,
}: Props) {
  return (
    <Flex
      justify='flex-end'
      align='center'
      gap={{ base: 1.5, md: 2 }}
      p={{ base: 2, md: 3 }}
    >
      <Button
        size={{ base: 'xs', md: 'md' }}
        gap='2'
        fontWeight='normal'
        alignItems='center'
        fontSize={{ base: 'xs', md: 'sm' }}
        onClick={onLike}
      >
        <Icon as={BiLike} boxSize={{ base: 3.5, md: 4 }} />
        {likesCount}
      </Button>
      <Button
        size={{ base: 'xs', md: 'md' }}
        gap='2'
        fontWeight='normal'
        alignItems='center'
        fontSize={{ base: 'xs', md: 'sm' }}
        onClick={onDislike}
      >
        <Icon as={BiDislike} boxSize={{ base: 3.5, md: 4 }} />
        {dislikesCount}
      </Button>
      {extras}
    </Flex>
  );
}
