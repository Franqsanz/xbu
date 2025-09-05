import { Box, Divider, Flex, Tag } from '@chakra-ui/react';

import { CommentForm } from '@components/comments/CommentForm';
import { CommentsList } from '@components/comments/CommentsList';
import { useFindAllComments } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';

type CommentType = {
  bookId: string;
};

export function Comments({ bookId }: CommentType) {
  const { currentUser } = useAuth();

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
      <Flex
        p='2'
        mb='3'
        align='center'
        gap='3'
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={{ base: 'center', lg: 'left' }}
        ml={{ base: 0, lg: 2 }}
      >
        Comentarios{' '}
        <Tag fontSize='xs' colorScheme='green'>
          Nuevo
        </Tag>
      </Flex>
      {currentUser && <CommentForm bookId={bookId} />}
      <CommentsList
        bookId={bookId}
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
