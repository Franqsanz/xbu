import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Flex, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { usePostComment } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';

type CommentType = {
  bookId: string;
};

export function CommentForm({ bookId }: CommentType) {
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const [comment, setComment] = useState('');
  const maxChars = 1500;

  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const userName = currentUser?.displayName;
  const myToast = useMyToast();
  const { mutateAsync, isPending } = usePostComment();

  function handleComment(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    if (value.length <= maxChars) setComment(value); // limita a 1500 caracteres
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await mutateAsync({
        text: comment,
        author: {
          userId: uid,
          username: userName,
        },
        bookId,
      });

      setComment('');
    } catch (error) {
      myToast({
        title: 'Error al enviar el comentario',
        icon: IoWarningSharp,
        iconColor: 'red.400',
        bgColor: 'black',
        width: '230px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' alignItems='end' gap='2' p='2'>
        <Textarea
          placeholder='Deja un comentario...'
          name='comment'
          value={comment}
          bg={bgColorInput}
          rounded='lg'
          h={{ base: '120px', md: '170px' }}
          onChange={handleComment}
          _focus={{ bg: 'transparent' }}
        />
        <Box as='span' fontSize='xs' alignSelf='end' mb='2'>
          {comment.length} / {maxChars}
        </Box>
        <Button
          type='submit'
          w={{ base: '100%', md: '165px' }}
          bg='green.500'
          color='black'
          p='3'
          border='1px'
          rounded='lg'
          textAlign='center'
          isDisabled={!comment || comment.length >= maxChars}
          isLoading={isPending}
          loadingText={isPending ? 'Comentando...' : 'Comentar'}
          _hover={{ outline: 'none', bg: 'green.600' }}
        >
          <Flex align='center'>
            <FaRegComment style={{ marginRight: '6px', transform: 'scaleX(-1)' }} />
            Comentar
          </Flex>
        </Button>
      </Flex>
    </form>
  );
}
