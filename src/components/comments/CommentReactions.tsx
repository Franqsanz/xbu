import { Button, Flex } from '@chakra-ui/react';
import { BiLike, BiDislike } from 'react-icons/bi';

import { ReactionsType } from '@components/types';

export function CommentReactions({
  likesCount,
  dislikesCount,
  onLike,
  onDislike,
}: ReactionsType) {
  return (
    <Flex justify='flex-end' align='center' gap='2' p='3'>
      <Button
        gap='2'
        fontWeight='normal'
        alignItems='center'
        fontSize='sm'
        onClick={onLike}
      >
        <BiLike />
        {likesCount}
      </Button>
      <Button
        gap='2'
        fontWeight='normal'
        alignItems='center'
        fontSize='sm'
        onClick={onDislike}
      >
        <BiDislike />
        {dislikesCount}
      </Button>
    </Flex>
  );
}
