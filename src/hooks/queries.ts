import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {
  getAllBooks,
  getAllSearchBooks,
  getAllFilterOptions,
  getBooksPaginate,
  getBook,
  getBooksFilter,
  getMoreBooks,
  getMostViewedBooks,
  getRelatedBooks,
  getMoreBooksAuthors,
  postBook,
  postRegister,
  getCheckUser,
  getUserAndBooks,
  patchToggleFavorite,
  updateBook,
  deleteBook,
  deleteAccount,
  getBooksFilterPaginated,
  getFindAllBookFavorite,
  getFindAllCollections,
  getFindOneCollection,
  deleteCollections,
  postCollections,
  patchCollectionsName,
  getCollectionsForUser,
  patchToggleBookInCollection,
  patchRemoveBookFromCollection,
  postComment,
  getFindAllComments,
  postLogout,
  postReactions,
  deleteComment,
  updateComment,
  postLogin,
  followUser,
  unfollowUser,
  getFollowStats,
  getFollowers,
  getFollowing,
  getFeed,
  getBookStatus,
  patchBookStatus,
  deleteBookStatus,
  getBooksByStatus,
} from '@services/api';
import { useAccountActions } from '@hooks/useAccountActions';
import { useAuth } from '@contexts/AuthContext';
import { keys } from '@utils/utils';
import { BookType, CommentType } from '@components/types';
import { queryClient } from '../config';

function useMutatePost() {
  return useMutation({
    mutationKey: [keys.postBook],
    mutationFn: postBook,
    // Mutación optimista
    onMutate: async (newPost) => {
      // Cancelar consultas pendientes para la misma clave de consulta
      await queryClient.cancelQueries({ queryKey: [keys.postBook] });

      // Obtener los datos de la consulta anterior
      const previousPost = await queryClient.getQueryData([keys.postBook]);

      // Actualizar los datos en caché con el nuevo post
      await queryClient.setQueryData(
        [keys.postBook],
        (oldData?: BookType[] | undefined) => {
          if (oldData === null) return [newPost];
          // oldData debe ser iterable por eso el (oldData || []).
          return [...(oldData || []), newPost];
        },
      );

      return { previousPost }; // <--- Contexto
    },
    onError: (err, variables, context) => {
      // Revertir los datos en caché si la mutación falla
      if (context?.previousPost !== null) {
        queryClient.setQueryData([keys.postBook], context?.previousPost);
      }
    },
    onSettled: async () => {
      // Invalidar la consulta en caché para que se refresque
      await queryClient.invalidateQueries({
        queryKey: [keys.postBook],
      });
    },
  });
}

function useAllBooks() {
  return useQuery({ queryKey: [keys.all], queryFn: getAllBooks });
}

function useAllSearchBooks(book: string) {
  return useQuery({
    queryKey: [keys.allSearch, book],
    queryFn: () => getAllSearchBooks(book),
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 1,
  });
}

function useAllFilterOptions() {
  return useQuery({
    queryKey: [keys.filtersOptions],
    queryFn: getAllFilterOptions,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
}

function useBooksPaginate() {
  return useInfiniteQuery({
    queryKey: [keys.paginate],
    queryFn: ({ pageParam }) => getBooksPaginate(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    retry: 1,
  });
}

function useFilterPaginated(query: string | undefined, param: string | undefined) {
  return useInfiniteQuery({
    queryKey: [keys.filterPaginated, query, param],
    queryFn: ({ pageParam }) => getBooksFilterPaginated(query, param, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    gcTime: 3000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

function useFilter(query: string | undefined, param: string | undefined) {
  return useQuery({
    queryKey: [keys.filter, query, param],
    queryFn: () => getBooksFilter(query, param),
    gcTime: 3000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

function useMostViewedBooks(query) {
  return useQuery({
    queryKey: [keys.mostViewed, query],
    queryFn: () => getMostViewedBooks(query),
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
    retry: false,
  });
}

function useMoreBooks(id: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.random, id],
    queryFn: () => getMoreBooks(id),
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
    retry: false,
  });
}

function useRelatedBooks(id: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.relatedBooks, id],
    queryFn: () => getRelatedBooks(id),
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
    retry: false,
  });
}

function useMoreBooksAuthors(id: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.moreBooksAuthors, id],
    queryFn: () => getMoreBooksAuthors(id),
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
    retry: false,
  });
}

function useBook(pathUrl: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.one, pathUrl],
    queryFn: () => getBook(pathUrl),
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: 1,
  });
}

function useFavoriteBook(bookId: any) {
  return useMutation({
    mutationKey: [keys.favoriteBook],
    mutationFn: ({
      userId,
      isFavorite,
    }: {
      userId: string | undefined;
      isFavorite: boolean;
    }) => patchToggleFavorite(userId, bookId, isFavorite),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
    },
  });
}

// Usuarios

function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (token: string) => postLogin(token),
  });
}

function useUserRegister(body: any) {
  const { logOut } = useAccountActions();

  return useMutation({
    mutationKey: [keys.userRegister],
    mutationFn: () => postRegister(body),
    onError: async (error) => {
      await logOut();
    },
  });
}

function useUserLogout() {
  return useMutation({
    mutationKey: [keys.userLogout],
    mutationFn: () => postLogout(),
  });
}

function useCheckUser() {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: [keys.checkUser],
    queryFn: getCheckUser,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: currentUser !== null,
  });
}

function useUserData() {
  // Alias para compatibilidad hacia atrás
  // Nota: Considerar eliminar esta función y usar useCheckUser directamente
  return useCheckUser();
}

function useProfile(username: string | undefined, userId: string | undefined) {
  return useInfiniteQuery({
    queryKey: [keys.profile, username],
    queryFn: ({ pageParam }) => getUserAndBooks(username, userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    enabled: !!username,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });
}

function useAllFavoriteByUser(userId: string | undefined) {
  return useInfiniteQuery({
    queryKey: [keys.userFavoriteBooks, userId],
    queryFn: ({ pageParam }) => getFindAllBookFavorite(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    enabled: !!userId,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });
}

function useCreateCollections(userId: string | undefined) {
  return useMutation({
    mutationKey: [keys.createCollections],
    mutationFn: (name: string) => postCollections(userId, name),
  });
}

function useCollectionBooks() {
  return useMutation({
    mutationKey: [keys.collectionsBooks],
    mutationFn: ({
      userId,
      collections,
      bookId,
      checked,
    }: {
      userId: string | undefined;
      collections: Array<{
        collectionId: string;
        collectionName: string;
        isInCollection: boolean;
      }>;
      bookId: string;
      checked: boolean;
    }) => patchToggleBookInCollection(userId, collections, bookId, checked),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
    },
  });
}

function useUpdateCollectionName(
  userId: string | undefined,
  collectionId: string | undefined,
) {
  return useMutation({
    mutationKey: [keys.updateCollectionsName],
    mutationFn: (name: string) => patchCollectionsName(userId, collectionId, name),
  });
}

function useCollections(userId: string | undefined) {
  return useQuery({
    queryKey: [keys.allCollections],
    queryFn: () => getFindAllCollections(userId),
    refetchOnWindowFocus: true,
    retry: false,
  });
}

function useCollectionsForUser(userId: string | undefined, bookId: string) {
  return useQuery({
    queryKey: [keys.allCollectionsForUser, userId, bookId],
    queryFn: () => getCollectionsForUser(userId, bookId),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
}

function useDeleteCollections() {
  return useMutation({
    mutationKey: [keys.deleteCollections],
    mutationFn: ([id, collectionId]: [string | undefined, string | undefined]) =>
      deleteCollections(id, collectionId),
    onError: async (error) => {
      console.error('Error en el servidor');
    },
  });
}

function useCollectionDetail(collectionId: string | undefined) {
  return useQuery({
    queryKey: [keys.collectionsDetail, collectionId],
    queryFn: () => getFindOneCollection(collectionId),
    refetchOnWindowFocus: true,
    retry: false,
  });
}

function useDeleteCollectionBook() {
  return useMutation({
    mutationKey: [keys.deleteCollectionBook],
    mutationFn: ({
      userId,
      collectionId,
      bookId,
    }: {
      userId: string | undefined;
      collectionId: string;
      bookId: string;
    }) => patchRemoveBookFromCollection(userId, collectionId, bookId),
    onError: async (error) => {
      console.error('Error en el servidor');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
    },
  });
}

function useDeleteBook() {
  return useMutation({
    mutationKey: [keys.deleteBook],
    mutationFn: (id: string | undefined) => deleteBook(id),
    onError: async (error) => {
      console.error('Error en el servidor');
    },
  });
}

function useUpdateBook(book: any) {
  const { logOut } = useAccountActions();

  return useMutation({
    mutationKey: [keys.updateBook],
    mutationFn: (id: string | undefined) => updateBook(id, book),
    onError: async (error) => {
      console.error('Error en el servidor');
      await logOut();
    },
  });
}

function useFindAllComments(bookId: string) {
  return useInfiniteQuery({
    queryKey: [keys.allComments, bookId],
    queryFn: ({ pageParam }) => getFindAllComments(bookId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    retry: false,
  });
}

function usePostComment() {
  return useMutation({
    mutationKey: [keys.postComment],
    mutationFn: ({
      text,
      author,
      bookId,
    }: {
      text: string;
      author: {
        userId: string | undefined;
        username: string | null | undefined;
        name?: string;
        avatar?: string;
      };
      bookId: string;
    }) => postComment(text, author, bookId),

    onMutate: async (newComment) => {
      const { bookId } = newComment;

      await queryClient.cancelQueries({
        queryKey: [keys.allComments, bookId],
      });

      const previousComments = queryClient.getQueryData([keys.allComments, bookId]);

      // Crear un comentario optimista con ID temporal
      const optimisticComment = {
        id: `temp-${Date.now()}`,
        text: newComment.text,
        author: {
          userId: newComment.author.userId,
          name: newComment.author.name,
          username: newComment.author.username,
          avatar: newComment.author.avatar,
        },
        bookId: newComment.bookId,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData([keys.allComments, bookId], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                info: {
                  totalBooks: 1,
                  totalPages: 1,
                  currentPage: 1,
                  nextPage: null,
                },
                results: [optimisticComment],
              },
            ],
            pageParams: [0],
          };
        }

        // Si hay datos, agregar el comentario a la primera página
        const updatedPages = [...oldData.pages];

        updatedPages[0] = {
          ...updatedPages[0],
          results: [optimisticComment, ...updatedPages[0].results],
        };

        const newData = {
          ...oldData,
          pages: updatedPages,
        };

        return newData;
      });

      return { previousComments, bookId };
    },

    onError: (err, newComment, context) => {
      // Revertir al estado anterior si hay error
      if (context) {
        queryClient.setQueryData(
          [keys.allComments, context.bookId],
          context.previousComments,
        );
      }
    },

    onSettled: async (data, error, variables) => {
      // Invalidar y refrescar los comentarios después de la mutación
      await queryClient.invalidateQueries({
        queryKey: [keys.allComments, variables.bookId],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.feed],
      });
    },
  });
}

function usePostReactions() {
  return useMutation({
    mutationFn: ({
      bookId,
      commentId,
      userId,
      type,
    }: {
      bookId: string;
      commentId: string;
      userId: string | undefined;
      type: 'like' | 'dislike';
    }) => postReactions(commentId, userId, type),

    onMutate: async ({ bookId, commentId, userId, type }) => {
      await queryClient.cancelQueries({ queryKey: [keys.allComments, bookId] });

      const previousData = queryClient.getQueryData([keys.allComments, bookId]);

      queryClient.setQueryData([keys.allComments, bookId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            results: page.results.map((comment: any) => {
              if (comment._id !== commentId) return comment;

              // Encontrar el comentario y determinar el estado actual del usuario
              const currentUserReaction = comment.reactions?.find(
                (reaction: any) => reaction.userId === userId,
              );

              let newLikesCount = comment.likesCount;
              let newDislikesCount = comment.dislikesCount;
              let newReactions = comment.reactions || [];

              if (type === 'like') {
                if (currentUserReaction?.type === 'like') {
                  // Usuario ya dio like, remover like
                  newLikesCount--;
                  newReactions = newReactions.filter(
                    (r: any) => r.userId !== userId,
                  );
                } else if (currentUserReaction?.type === 'dislike') {
                  // Usuario tenía dislike, cambiar a like
                  newDislikesCount--;
                  newLikesCount++;
                  newReactions = newReactions.map((r: any) =>
                    r.userId === userId ? { ...r, type: 'like' } : r,
                  );
                } else {
                  // Usuario no había reaccionado, agregar like
                  newLikesCount++;
                  newReactions.push({ userId, type: 'like' });
                }
              } else {
                // type === 'dislike'
                if (currentUserReaction?.type === 'dislike') {
                  // Usuario ya dio dislike, remover dislike
                  newDislikesCount--;
                  newReactions = newReactions.filter(
                    (r: any) => r.userId !== userId,
                  );
                } else if (currentUserReaction?.type === 'like') {
                  // Usuario tenía like, cambiar a dislike
                  newLikesCount--;
                  newDislikesCount++;
                  newReactions = newReactions.map((r: any) =>
                    r.userId === userId ? { ...r, type: 'dislike' } : r,
                  );
                } else {
                  // Usuario no había reaccionado, agregar dislike
                  newDislikesCount++;
                  newReactions.push({ userId, type: 'dislike' });
                }
              }

              return {
                ...comment,
                likesCount: newLikesCount,
                dislikesCount: newDislikesCount,
                reactions: newReactions,
              };
            }),
          })),
        };
      });

      return { previousData };
    },

    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [keys.allComments, variables.bookId],
          context.previousData,
        );
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [keys.allComments, variables.bookId],
      });
    },
  });
}

function useUpdateComment() {
  return useMutation({
    mutationKey: [keys.updateComment],
    mutationFn: ({
      commentId,
      userId,
      text,
    }: {
      commentId: string;
      userId: string | undefined;
      text: string;
    }) => updateComment(commentId, userId, text),
    onError: (error) => {
      console.error('Error updating comment');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
    },
  });
}

function useDeleteComment() {
  return useMutation({
    mutationKey: [keys.deleteComment],
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string | undefined;
    }) => deleteComment(commentId, userId),
    onError: async (error) => {
      console.error('Error en el servidor');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
    },
  });
}

function useDeleteAccount() {
  return useMutation({
    mutationKey: [keys.deleteAccount],
    mutationFn: (id: string | undefined) => deleteAccount(id),
  });
}

function useFollowUser() {
  return useMutation({
    mutationKey: [keys.followUser],
    mutationFn: (targetUserId: string) => followUser(targetUserId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.followStats],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.profile],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.followers],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.following],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.feed],
      });
    },
  });
}

function useUnfollowUser() {
  return useMutation({
    mutationKey: [keys.unfollowUser],
    mutationFn: (targetUserId: string) => unfollowUser(targetUserId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.followStats],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.profile],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.followers],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.following],
      });
      await queryClient.invalidateQueries({
        queryKey: [keys.feed],
      });
    },
  });
}

function useFollowStats(userId: string | undefined) {
  return useQuery({
    queryKey: [keys.followStats, userId],
    queryFn: () => getFollowStats(userId!),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}

function useFollowers(userId: string | undefined, enabled: boolean = true) {
  return useInfiniteQuery({
    queryKey: [keys.followers, userId],
    queryFn: ({ pageParam }) => getFollowers(userId!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (acc, page) => acc + (page.followers?.length || 0),
        0,
      );
      if (loaded >= lastPage.totalFollowers) return undefined;
      return allPages.length;
    },
    enabled: !!userId && enabled,
    refetchOnWindowFocus: false,
  });
}

type BookStatusValue = 'read' | 'reading' | 'want_to_read';

function useBookStatus(bookId: string | undefined) {
  return useQuery({
    queryKey: [keys.bookStatus, bookId],
    queryFn: () => getBookStatus(bookId!),
    enabled: !!bookId,
    refetchOnWindowFocus: false,
  });
}

function useSetBookStatus(bookId: string) {
  return useMutation({
    mutationFn: (status: BookStatusValue) => patchBookStatus(bookId, status),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.bookStatus, bookId],
      });
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
      // removeQueries en vez de invalidate: borra la cache para que al volver a
      // /my-library el fetch sea fresh y no haya flash de datos stale.
      queryClient.removeQueries({ queryKey: [keys.booksByStatus] });
    },
  });
}

function useDeleteBookStatus(bookId: string) {
  return useMutation({
    mutationFn: () => deleteBookStatus(bookId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.bookStatus, bookId],
      });
      await queryClient.invalidateQueries({ queryKey: [keys.feed] });
      queryClient.removeQueries({ queryKey: [keys.booksByStatus] });
    },
  });
}

function useFeed(enabled: boolean = true) {
  return useInfiniteQuery({
    queryKey: [keys.feed],
    queryFn: ({ pageParam }) => getFeed(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return undefined;
      return lastPage.info.nextPage;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}

function useBooksByStatus(
  status: 'read' | 'reading' | 'want_to_read',
  enabled: boolean = true,
) {
  return useInfiniteQuery({
    queryKey: [keys.booksByStatus, status],
    queryFn: ({ pageParam }) => getBooksByStatus(status, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return undefined;
      return lastPage.info.nextPage;
    },
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    staleTime: 0,
  });
}

function useFollowing(userId: string | undefined, enabled: boolean = true) {
  return useInfiniteQuery({
    queryKey: [keys.following, userId],
    queryFn: ({ pageParam }) => getFollowing(userId!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (acc, page) => acc + (page.following?.length || 0),
        0,
      );
      if (loaded >= lastPage.totalFollowing) return undefined;
      return allPages.length;
    },
    enabled: !!userId && enabled,
    refetchOnWindowFocus: false,
  });
}

export {
  useMutatePost,
  useAllFilterOptions,
  useAllBooks,
  useAllSearchBooks,
  useBooksPaginate,
  useBook,
  useFilterPaginated,
  useFilter,
  useMoreBooks,
  useMostViewedBooks,
  useRelatedBooks,
  useMoreBooksAuthors,
  useFavoriteBook,
  useCollections,
  useCollectionsForUser,
  useCollectionDetail,
  useCreateCollections,
  useCollectionBooks,
  useUpdateCollectionName,
  useDeleteCollections,
  useDeleteCollectionBook,
  useFindAllComments,
  usePostComment,
  usePostReactions,
  useUpdateComment,
  useDeleteComment,

  // Usuarios
  useLogin,
  useUserRegister,
  useUserLogout,
  useCheckUser,
  useUserData,
  useProfile,
  useAllFavoriteByUser,
  useUpdateBook,
  useDeleteBook,
  useDeleteAccount,
  useFollowUser,
  useUnfollowUser,
  useFollowStats,
  useFollowers,
  useFollowing,
  useFeed,
  useBookStatus,
  useSetBookStatus,
  useDeleteBookStatus,
  useBooksByStatus,
};
