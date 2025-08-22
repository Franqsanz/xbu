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
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import {
  useDeleteComment,
  usePostReactions,
  useUpdateComment,
} from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { CommentType } from '@components/types';
import { useMyToast } from '@hooks/useMyToast';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
import { CommentEditor } from '@components/comments/CommentEditor';
import { CommentReactions } from '@components/comments/CommentReactions';
import { formatDate } from '@utils/utils';

export function CommentsList({
  bookId,
  commentsData,
  isPending,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
}: CommentType) {
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
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
  const { mutateAsync: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  const allComments = commentsData?.pages.flatMap((page) => page.results) || [];
  const totalComments =
    commentsData?.pages[0]?.info?.totalBooks || allComments.length;
  const currentPage =
    commentsData?.pages[commentsData.pages.length - 1]?.info?.currentPage || 1;
  const totalPages = commentsData?.pages[0]?.info?.totalPages || 1;

  if (isError) {
    return (
      <Center mt='5' p='8'>
        <Flex direction='column' align='center' gap='3'>
          <Text color={emptyStateColor}>Error al obtener los comentarios</Text>
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
          <Box as='span' fontSize='lg'>
            📝
          </Box>
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

  async function handleReaction(commentId: string, type: 'like' | 'dislike') {
    await postReactions({ bookId, commentId, userId: uid, type });
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

  function cancelEdit() {
    setEditingCommentId(null);
  }

  async function saveEdit(commentId: string, newText: string) {
    try {
      await updateComment({
        commentId,
        userId: uid,
        text: newText.trim(),
      });

      myToast({
        title: 'Comentario actualizado',
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

      setEditingCommentId(null);
      refetch();
    } catch (error) {
      myToast({
        title: 'Error al actualizar el comentario',
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
      <ModalConfirmation
        isOpen={isOpenDelete}
        title='este comentario'
        isStrong={false}
        warningText='El comentario será eliminado de manera permanente.'
        onDeleteBook={() => {
          if (commentToDelete) handleDeleteComment(commentToDelete);
          onCloseDelete();
        }}
        isPending={isDeleting}
        onClose={onCloseDelete}
      />
      <Flex flexDirection='column' gap='5' mt='10' px='2'>
        {totalComments > 0 && (
          <Text fontSize='sm' mb='2' px='3'>
            {totalComments} Resultado{totalComments !== 1 ? 's' : ''}
          </Text>
        )}
        {allComments.map(
          ({
            _id,
            author,
            text,
            likesCount,
            dislikesCount,
            isEdited,
            createdAt,
          }) => (
            <Flex
              key={_id}
              flexDirection='column'
              gap='3'
              p='3'
              border='1px'
              borderColor={borderCard}
              rounded='lg'
            >
              <Flex justify='space-between' p={{ base: 2, sm: 3 }}>
                <Flex gap='2' align={{ base: 'start', sm: 'center' }}>
                  <Avatar
                    name={author.username}
                    src={author.avatar as string}
                    size={{ base: 'xs', md: 'sm' }}
                    referrerPolicy='no-referrer'
                  />
                  <Box as='span' fontSize={{ base: 'xs', sm: 'sm' }}>
                    {author.username}
                  </Box>
                </Flex>
                <Flex gap='1' align={{ base: 'start', sm: 'center' }}>
                  <Flex
                    gap='1'
                    fontSize={{ base: '10px', sm: 'xs' }}
                    flexDirection={{ base: 'column', sm: 'row' }}
                  >
                    <Box as='span' color={colorDate}>
                      {formatDate(createdAt)}
                    </Box>
                    {isEdited && (
                      <Box as='span' color={colorDate}>
                        (Editado)
                      </Box>
                    )}
                  </Flex>
                  {author.userId === uid && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FiMoreHorizontal />}
                        bg='transparent'
                        alignItems={{ base: 'flex-start', sm: 'center' }}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                      />
                      <MenuList p='0' fontSize='sm'>
                        <MenuItem p='2' onClick={() => setEditingCommentId(_id)}>
                          Editar
                        </MenuItem>
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
              {editingCommentId === _id ? (
                <CommentEditor
                  initialText={text}
                  isUpdating={isUpdating}
                  onCancel={cancelEdit}
                  onSave={(newText) => saveEdit(_id, newText)}
                />
              ) : (
                <Text
                  fontSize='sm'
                  px={{ base: 3, sm: 6 }}
                  py='3'
                  whiteSpace='pre-wrap'
                >
                  {text}
                </Text>
              )}
              {editingCommentId !== _id && currentUser && (
                <CommentReactions
                  likesCount={likesCount}
                  dislikesCount={dislikesCount}
                  onLike={() => handleReaction(_id, 'like')}
                  onDislike={() => handleReaction(_id, 'dislike')}
                />
              )}
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
