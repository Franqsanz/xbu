import React from 'react';
import { Box } from '@chakra-ui/react';

import { CommentForm } from '@components/comments/CommentForm';
import { CommentsList } from '@components/comments/CommentsList';

type CommentType = {
  bookId: string;
};

export function Comments({ bookId }: CommentType) {
  return (
    <>
      <Box
        p='2'
        mb='3'
        mt='5'
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={{ base: 'center', lg: 'left' }}
        ml={{ base: 0, lg: 2 }}
      >
        Comentarios
      </Box>
      <CommentForm bookId={bookId} />
      <CommentsList bookId={bookId} />
    </>
  );
}
