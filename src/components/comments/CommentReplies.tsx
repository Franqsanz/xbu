import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FiChevronDown,
  FiChevronUp,
  FiCornerDownRight,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarningSharp } from 'react-icons/io5';

import {
  useCommentReplies,
  useDeleteComment,
  usePostReactions,
  useUpdateComment,
} from '@hooks/queries';
import { useAuth } from '@contexts/AuthContext';
import { useMyToast } from '@hooks/useMyToast';
import { CommentForm } from '@components/comments/CommentForm';
import { CommentEditor } from '@components/comments/CommentEditor';
import { CommentReactions } from '@components/comments/CommentReactions';
import { ModalConfirmation } from '@components/modals/ModalConfirmation';
import { parseDate } from '@utils/utils';
import { cldAvatar } from '@utils/images';

type Props = {
  bookId: string;
  commentId: string;
  repliesCount: number;
  // Cuando el padre acaba de crear una respuesta al comment top-level,
  // aumentamos este contador para expandir automáticamente el hilo.
  expandTrigger?: number;
};

type ReplyNode = {
  reply: any;
  children: ReplyNode[];
};

// Convierte la lista plana de replies en un árbol usando replyToId.
// Los que no tienen replyToId cuelgan del comment top-level (raíz).
function buildTree(replies: any[]): ReplyNode[] {
  const map = new Map<string, ReplyNode>();
  const roots: ReplyNode[] = [];
  for (const r of replies) {
    const id = r._id ?? r.id;
    map.set(id, { reply: r, children: [] });
  }
  for (const r of replies) {
    const id = r._id ?? r.id;
    const node = map.get(id)!;
    if (r.replyToId && map.has(r.replyToId)) {
      map.get(r.replyToId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

// Máximo de niveles visuales para no romper el layout en mobile.
const MAX_INDENT_LEVEL = 3;

export function CommentReplies({
  bookId,
  commentId,
  repliesCount,
  expandTrigger,
}: Props) {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const myToast = useMyToast();
  const [expanded, setExpanded] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [replyToDelete, setReplyToDelete] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  useEffect(() => {
    if (expandTrigger && expandTrigger > 0) setExpanded(true);
  }, [expandTrigger]);
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const subColor = useColorModeValue('gray.600', 'gray.400');
  const replyBg = useColorModeValue('gray.50', 'gray.700');
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    data,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useCommentReplies(commentId, expanded);
  const { mutateAsync: postReactions } = usePostReactions();
  const { mutateAsync: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  const replies = data?.pages.flatMap((p: any) => p.results) ?? [];
  const tree = buildTree(replies);

  async function handleReaction(replyId: string, type: 'like' | 'dislike') {
    await postReactions({ bookId, commentId: replyId, userId: uid, type });
  }

  async function handleDeleteReply(replyId: string) {
    try {
      await deleteComment({ commentId: replyId, userId: uid });
      myToast({
        title: 'Se eliminó la respuesta.',
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '220px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
      refetch();
    } catch (err) {
      console.error('Error al eliminar respuesta', err);
    }
  }

  async function saveEditReply(replyId: string, newText: string) {
    try {
      await updateComment({
        commentId: replyId,
        userId: uid,
        text: newText.trim(),
      });
      myToast({
        title: 'Respuesta actualizada',
        icon: FaCheckCircle,
        iconColor: 'green.700',
        bgColor: 'black',
        width: '220px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
      setEditingReplyId(null);
      refetch();
    } catch (err) {
      myToast({
        title: 'Error al actualizar la respuesta',
        icon: IoWarningSharp,
        iconColor: 'red.400',
        bgColor: 'black',
        width: '260px',
        color: 'whitesmoke',
        align: 'center',
        padding: '1',
        fntSize: 'md',
        bxSize: 5,
      });
    }
  }

  function renderNode(node: ReplyNode, level: number) {
    const r = node.reply;
    const replyId = r._id ?? r.id;
    const isOwner = r.author?.userId === uid;
    const indent = Math.min(level, MAX_INDENT_LEVEL);
    return (
      <Flex
        key={replyId}
        direction='column'
        gap='2'
        pl={indent > 0 ? { base: 2, md: 4 } : '0'}
        borderLeft={indent > 0 ? '2px' : '0'}
        borderColor={borderColor}
      >
        <Flex direction='column' gap='2' py='2' px='3' bg={replyBg} rounded='md'>
          <Flex justify='space-between' align='center'>
            <Flex gap='2' align='center'>
              <Avatar
                name={r.author?.username}
                src={cldAvatar(r.author?.avatar, 32)}
                size='xs'
                referrerPolicy='no-referrer'
              />
              <Link
                as={NavLink}
                to={`/profile/${r.author?.username}`}
                fontSize='xs'
                fontWeight='500'
                _hover={{ textDecoration: 'underline' }}
              >
                {r.author?.name}
              </Link>
            </Flex>
            <Flex gap='1' align='center'>
              <Flex gap='1' fontSize='10px' color={subColor}>
                <Box as='span'>{parseDate(r.createdAt, 'short')}</Box>
                {r.isEdited && <Box as='span'>(Editado)</Box>}
              </Flex>
              {isOwner && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Opciones'
                    icon={<FiMoreHorizontal />}
                    size='xs'
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                  />
                  <MenuList p='0' fontSize='sm'>
                    <MenuItem p='2' onClick={() => setEditingReplyId(replyId)}>
                      Editar
                    </MenuItem>
                    <MenuItem
                      p='2'
                      onClick={() => {
                        setReplyToDelete(replyId);
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
          {editingReplyId === replyId ? (
            <CommentEditor
              initialText={r.text}
              isUpdating={isUpdating}
              onCancel={() => setEditingReplyId(null)}
              onSave={(newText) => saveEditReply(replyId, newText)}
            />
          ) : (
            <Text fontSize='sm' whiteSpace='pre-wrap' pl='6'>
              {r.text}
            </Text>
          )}
          {editingReplyId !== replyId && currentUser && (
            <CommentReactions
              likesCount={r.likesCount ?? 0}
              dislikesCount={r.dislikesCount ?? 0}
              onLike={() => handleReaction(replyId, 'like')}
              onDislike={() => handleReaction(replyId, 'dislike')}
              extras={
                <Button
                  size={{ base: 'xs', md: 'md' }}
                  gap='2'
                  fontWeight='normal'
                  alignItems='center'
                  fontSize={{ base: 'xs', md: 'sm' }}
                  onClick={() =>
                    setReplyingToId((v) => (v === replyId ? null : replyId))
                  }
                >
                  <Icon as={FiCornerDownRight} boxSize={{ base: 3.5, md: 4 }} />
                  {replyingToId === replyId ? 'Cancelar' : 'Responder'}
                </Button>
              }
            />
          )}
        </Flex>
        {replyingToId === replyId && (
          <Box pl={{ base: 2, md: 4 }} borderLeft='2px' borderColor={borderColor}>
            <CommentForm
              bookId={bookId}
              parentId={commentId}
              replyToId={replyId}
              compact
              autoFocus
              onSubmitted={() => setReplyingToId(null)}
              onCancel={() => setReplyingToId(null)}
            />
          </Box>
        )}
        {node.children.length > 0 && (
          <Flex direction='column' gap='2'>
            {node.children.map((child) => renderNode(child, level + 1))}
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <>
      <ModalConfirmation
        isOpen={isOpenDelete}
        title='esta respuesta'
        isStrong={false}
        warningText='La respuesta será eliminada de manera permanente.'
        onDeleteBook={() => {
          if (replyToDelete) handleDeleteReply(replyToDelete);
          onCloseDelete();
        }}
        isPending={isDeleting}
        onClose={onCloseDelete}
      />
      <Flex direction='column' gap='2' pl={{ base: 3, md: 6 }}>
        {repliesCount > 0 && (
          <Flex align='center' gap='3' fontSize='sm'>
            <Button
              size='xs'
              variant='ghost'
              leftIcon={expanded ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Ocultar' : `Ver ${repliesCount}`}{' '}
              {repliesCount === 1 ? 'respuesta' : 'respuestas'}
            </Button>
          </Flex>
        )}
        {expanded && (
          <Flex
            direction='column'
            gap='3'
            pl={{ base: 2, md: 4 }}
            borderLeft='2px'
            borderColor={borderColor}
          >
            {isPending ? (
              <Flex justify='center' py='3'>
                <Spinner size='sm' />
              </Flex>
            ) : (
              tree.map((node) => renderNode(node, 0))
            )}
            {hasNextPage && (
              <Button
                size='xs'
                variant='ghost'
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Ver más
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
}
