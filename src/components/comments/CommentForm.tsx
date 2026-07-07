import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Flex, Textarea, useColorModeValue } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import { usePostComment } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';

type CommentType = {
  bookId: string;
  parentId?: string | null;
  replyToId?: string | null;
  compact?: boolean;
  autoFocus?: boolean;
  initialText?: string;
  onSubmitted?: () => void;
  onCancel?: () => void;
};

export function CommentForm({
  bookId,
  parentId,
  replyToId,
  compact,
  autoFocus,
  initialText,
  onSubmitted,
  onCancel,
}: CommentType) {
  const bgColorInput = useColorModeValue('gray.100', 'gray.800');
  const [comment, setComment] = useState(initialText ?? '');
  const maxChars = 1500;

  const { currentUser, userData } = useAuth();
  const uid = currentUser?.uid;
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
          name: userData?.name,
          username: userData?.username,
          avatar: userData?.picture,
        },
        bookId,
        parentId: parentId ?? null,
        replyToId: replyToId ?? null,
      });

      setComment('');
      onSubmitted?.();
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
      <Flex flexDirection='column' alignItems='end' gap='2' p={compact ? '0' : '2'}>
        <Textarea
          placeholder={compact ? 'Escribí tu respuesta…' : 'Deja un comentario...'}
          name='comment'
          value={comment}
          bg={bgColorInput}
          rounded='lg'
          h={compact ? '90px' : { base: '120px', md: '170px' }}
          onChange={handleComment}
          autoFocus={autoFocus}
          _focus={{ bg: 'transparent' }}
        />
        <Box as='span' fontSize='xs' alignSelf='end' mb='2'>
          {comment.length} / {maxChars}
        </Box>
        <Flex gap='2' w={compact ? 'auto' : { base: '100%', md: 'auto' }}>
          {compact && onCancel && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onCancel}
              isDisabled={isPending}
            >
              Cancelar
            </Button>
          )}
          <Button
            type='submit'
            w={compact ? 'auto' : { base: '100%', md: '165px' }}
            size={compact ? 'sm' : 'md'}
            bg='green.500'
            color='black'
            p={compact ? '4' : '3'}
            border='1px'
            rounded='lg'
            textAlign='center'
            isDisabled={!comment || comment.length >= maxChars}
            isLoading={isPending}
            loadingText={
              isPending ? (compact ? 'Enviando...' : 'Comentando...') : 'Comentar'
            }
            _hover={{ outline: 'none', bg: 'green.600' }}
          >
            <Flex align='center'>
              <FaRegComment
                style={{ marginRight: '6px', transform: 'scaleX(-1)' }}
              />
              {compact ? 'Responder' : 'Comentar'}
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
