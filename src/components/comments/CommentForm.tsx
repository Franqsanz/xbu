import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Flex, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FaCheckCircle, FaRegComment } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { usePostComment } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';

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
  const myToast = useMyToast();
  const { mutateAsync, isPending } = usePostComment();

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

      // myToast({
      //   title: 'se ha enviado el comentario.',
      //   icon: FaCheckCircle,
      //   iconColor: 'green.700',
      //   bgColor: 'black',
      //   width: '230px',
      //   color: 'whitesmoke',
      //   align: 'center',
      //   padding: '1',
      //   fntSize: 'md',
      //   bxSize: 5,
      // });

      setComment('');
      refetch();
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
    <>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection='column' alignItems='end' gap='3' p='2'>
          <Textarea
            placeholder='Deja un comentario...'
            name='comment'
            value={comment}
            bg={bgColorInput}
            rounded='lg'
            h={{ base: '120px', md: '170px' }}
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
