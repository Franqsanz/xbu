import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useFindAllComments } from '@hooks/queries';

type CommentType = {
  bookId: string;
};

export function CommentsList({ bookId }: CommentType) {
  const borderCard = useColorModeValue('gray.200', 'gray.600');

  const { data } = useFindAllComments(bookId);

  return (
    <>
      <Flex flexDirection='column' gap='5' mt='10'>
        {data?.results.map(({ id, author, text }) => (
          <Flex
            key={id}
            flexDirection='column'
            gap='0.5'
            p='3'
            border='1px'
            borderColor={borderCard}
            rounded='lg'
          >
            <Box as='span' fontSize='lg'>
              {author.username}
            </Box>
            <Text fontSize='sm'>{text}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
