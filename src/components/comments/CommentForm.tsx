import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Flex, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';

import { usePostComment } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';

type CommentType = {
  bookId: string;
};

export function CommentForm({ bookId }: CommentType) {
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const [comment, setComment] = useState('');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const userName = currentUser?.displayName;
  const { mutateAsync, isPending, isError } = usePostComment();

  function handleNameCollection(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setComment(value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutateAsync({
      text: comment,
      author: {
        userId: uid,
        username: userName,
      },
      bookId,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column' alignItems='end' gap='3' p='2'>
          <Textarea
            placeholder='Deja un comentario...'
            name='comment'
            value={comment}
            bg={bgColorInput}
            rounded='lg'
            onChange={handleNameCollection}
            _focus={{ bg: 'transparent' }}
          />
          <Button
            type='submit'
            w={{ base: '100%', md: '165px' }}
            bg='green.500'
            color='black'
            p='3'
            border='1px'
            rounded='lg'
            textAlign='center'
            isDisabled={!comment}
            isLoading={isPending}
            _hover={{ outline: 'none', bg: 'green.600' }}
          >
            <Flex align='center'>
              <FaRegComment
                style={{ marginRight: '6px', transform: 'scaleX(-1)' }}
              />
              Comentar
            </Flex>
          </Button>
        </Flex>
      </form>
    </>
  );
}
