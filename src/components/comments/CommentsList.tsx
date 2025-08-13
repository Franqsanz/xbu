import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

import { useDeleteComment, usePostReactions } from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { CommentType } from '@components/types';
import { useMyToast } from '@hooks/useMyToast';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';

export function CommentsList({
  commentsData,
  isPending,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
}: CommentType) {
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const borderCard = useColorModeValue('gray.200', 'gray.600');
  const colorDate = useColorModeValue('gray.600', 'gray.300');
  const emptyStateColor = useColorModeValue('gray.600', 'gray.400');
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const myToast = useMyToast();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { mutateAsync: postReactions } = usePostReactions();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const allComments = commentsData?.pages.flatMap((page) => page.results) || [];
  const totalComments =
    commentsData?.pages[0]?.info?.totalBooks || allComments.length;
  const currentPage =
    commentsData?.pages[commentsData.pages.length - 1]?.info?.currentPage || 1;
  const totalPages = commentsData?.pages[0]?.info?.totalPages || 1;

  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const formatted = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);

    return formatted.replace(/(\d{4})$/, ', $1');
  }

  if (isError) {
    return (
      <Center mt='5' p='8'>
        <Flex direction='column' align='center' gap='3'>
          <Text color='red.500'>Error al obtener los comentarios</Text>
          <Button
            bg='green.500'
            color='black'
            p='3'
            border='1px'
            rounded='lg'
            textAlign='center'
            onClick={refetch}
            _hover={{ outline: 'none', bg: 'green.600' }}
          >
            Reintentar
          </Button>
        </Flex>
      </Center>
    );
  }

  if (isPending) {
    return (
      <Center mt='5' p='8'>
        <Text color={emptyStateColor}>Cargando comentarios...</Text>
      </Center>
    );
  }

  if (allComments.length === 0) {
    return (
      <Center mt='5' p='8'>
        <Flex direction='column' align='center' gap='2'>
          <Text fontSize='lg' color={emptyStateColor}>
            📝
          </Text>
          <Text fontSize='md' color={emptyStateColor} textAlign='center'>
            No hay comentarios aún
          </Text>
          <Text fontSize='sm' color={emptyStateColor} textAlign='center'>
            ¡Sé el primero en comentar!
          </Text>
        </Flex>
      </Center>
    );
  }

  async function handleLike(commentId: string) {
    try {
      await postReactions({
        commentId,
        userId: uid,
        type: 'like',
      });
      refetch();
    } catch (error) {
      console.error('Error al enviar like');
    }
  }

  async function handleDisLike(commentId: string) {
    try {
      await postReactions({
        commentId,
        userId: uid,
        type: 'dislike',
      });
      refetch();
    } catch (error) {
      console.error('Error al enviar dislike');
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      await deleteComment({ commentId, userId: uid });

      myToast({
        title: 'Se elimino el comentario.',
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '200px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });

      refetch();
    } catch (error) {
      console.error('Error al eliminar comentario');
    }
  }

  return (
    <>
      <ModalConfirmation
        isOpen={isOpenDelete}
        title='este comentario'
        isStrong={false}
        warningText='El comentario será eliminado de manera permanente.'
        onDeleteBook={() => {
          if (commentToDelete) handleDeleteComment(commentToDelete);
          onCloseDelete();
        }}
        isPending={isPending}
        onClose={onCloseDelete}
      />
      <Flex flexDirection='column' gap='5' mt='10' px='2'>
        {totalComments > 0 && (
          <Text fontSize='sm' mb='2' px='3'>
            {totalComments} Resultado{totalComments !== 1 ? 's' : ''}
          </Text>
        )}
        {allComments.map(
          ({ _id, author, text, likesCount, dislikesCount, createdAt }) => (
            <Flex
              key={_id}
              flexDirection='column'
              gap='3'
              p='3'
              border='1px'
              borderColor={borderCard}
              rounded='lg'
            >
              <Flex justify='space-between' p='3'>
                <Flex gap='2' align='center'>
                  <Avatar
                    name={author.username}
                    size={{ base: 'xs', md: 'sm' }}
                    referrerPolicy='no-referrer'
                  />
                  <Box as='span' fontSize='sm'>
                    {author.username}
                  </Box>
                </Flex>
                <Flex gap='2' align='center'>
                  <Box as='span' fontSize='xs' color={colorDate}>
                    {formatDate(createdAt)}
                  </Box>
                  {author.userId === uid && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FiMoreVertical />}
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                      />
                      <MenuList p='0' fontSize='sm'>
                        <MenuItem p='2'>Editar</MenuItem>
                        <MenuItem
                          p='2'
                          onClick={() => {
                            setCommentToDelete(_id);
                            onOpenDelete();
                          }}
                        >
                          Eliminar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Flex>
              <Text fontSize='sm' px='6' py='3' whiteSpace='pre-wrap'>
                {text}
              </Text>
              <Flex justify='flex-end' align='center' gap='2' p='3'>
                <Button
                  gap='2'
                  fontWeight='normal'
                  alignItems='center'
                  fontSize='sm'
                  onClick={() => handleLike(_id)}
                >
                  <BiLike />
                  {likesCount}
                </Button>
                <Button
                  gap='2'
                  fontWeight='normal'
                  alignItems='center'
                  fontSize='sm'
                  onClick={() => handleDisLike(_id)}
                >
                  <BiDislike />
                  {dislikesCount}
                </Button>
              </Flex>
            </Flex>
          ),
        )}
        {hasNextPage && (
          <Center mt='4'>
            <Button
              size='sm'
              onClick={fetchNextPage}
              isLoading={isFetchingNextPage}
              loadingText='Cargando...'
            >
              Ver más comentarios ({currentPage} de {totalPages})
            </Button>
          </Center>
        )}
        {!hasNextPage && allComments.length > 5 && (
          <Center mt='4'>
            <Text fontSize='sm' color={emptyStateColor}>
              Has visto todos los comentarios
            </Text>
          </Center>
        )}
      </Flex>
    </>
  );
}
