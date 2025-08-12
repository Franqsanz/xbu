import React from 'react';
import { Box, Divider } from '@chakra-ui/react';

import { CommentForm } from '@components/comments/CommentForm';
import { CommentsList } from '@components/comments/CommentsList';
import { useFindAllComments } from '@hooks/queries';

type CommentType = {
  bookId: string;
};

export function Comments({ bookId }: CommentType) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFindAllComments(bookId);

  return (
    <>
      <Box mt='10' mb='5'>
        <Divider borderColor='gray.400' />
      </Box>
      <Box
        p='2'
        mb='3'
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={{ base: 'center', lg: 'left' }}
        ml={{ base: 0, lg: 2 }}
      >
        Comentarios
      </Box>
      <CommentForm bookId={bookId} refetch={() => refetch()} />
      <CommentsList
        commentsData={data}
        isPending={isPending}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
      />
    </>
  );
}
