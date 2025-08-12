import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Flex, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';

import { usePostComment } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';

type CommentType = {
  bookId: string;
  refetch: () => void;
};

export function CommentForm({ bookId, refetch }: CommentType) {
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
      setComment(''); // Solo limpia si fue exitoso
      refetch(); // Llama al refetch
    } catch (error) {
      console.error('Error al enviar comentario');
    }
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
            rows={8}
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
            loadingText={isPending ? 'Comentando...' : 'Comentar'}
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
