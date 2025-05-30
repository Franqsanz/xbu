import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useInfiniteQuery,
  QueryClient,
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
  postLogout,
} from '@services/api';
import { useAccountActions } from '@hooks/useAccountActions';
import { keys } from '@utils/utils';
import { BookType } from '@components/types';
// import { useAuth } from '@contexts/AuthContext';

const queryClient = new QueryClient();

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
      console.log(err);
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
  return useSuspenseQuery({
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

function useBook(pathUrl: string | undefined, token?: string | null) {
  return useSuspenseQuery({
    queryKey: [keys.one, pathUrl],
    queryFn: () => getBook(pathUrl, token),
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: 1,
  });
}

function useFavoriteBook(body: any, isFavorite: boolean) {
  return useMutation({
    mutationKey: [keys.favoriteBook],
    mutationFn: (userId: string | undefined) =>
      patchToggleFavorite(userId, body, isFavorite),
  });
}

// Usuarios

function useUserRegister(body: any) {
  const { logOut } = useAccountActions();

  return useMutation({
    mutationKey: [keys.userRegister],
    mutationFn: (token: string) => postRegister(token, body),
    onError: async (error) => {
      console.error('Error en el servidor:', error);
      await logOut();
    },
  });
}

function useUserLogout() {
  return useMutation({
    mutationKey: [keys.userLogout],
    mutationFn: (token: string | undefined) => postLogout(token),
    onError: async (error) => {
      console.error('Error en el servidor:', error);
    },
  });
}

function useCheckUser(id: string | undefined) {
  return useQuery({
    queryKey: [keys.checkUser, id],
    queryFn: () => getCheckUser(id),
    gcTime: 0,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

function useUserData(id: string | undefined) {
  return useQuery({
    queryKey: [keys.userData, id],
    queryFn: () => getCheckUser(id),
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });
}

function useProfile(
  username: string | undefined,
  userId: string | undefined,
  token: string | null,
) {
  return useInfiniteQuery({
    queryKey: [keys.profile, username, userId, token],
    queryFn: ({ pageParam }) => getUserAndBooks(username, userId, token, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
    enabled: !!token,
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
      console.error('Error en el servidor:', error);
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
      console.error('Error en el servidor:', error);
    },
  });
}

function useDeleteBook() {
  return useMutation({
    mutationKey: [keys.deleteBook],
    mutationFn: (id: string | undefined) => deleteBook(id),
    onError: async (error) => {
      console.error('Error en el servidor:', error);
    },
  });
}

function useUpdateBook(book: any) {
  const { logOut } = useAccountActions();

  return useMutation({
    mutationKey: [keys.updateBook],
    mutationFn: (id: string | undefined) => updateBook(id, book),
    onError: async (error) => {
      console.error('Error en el servidor:', error);
      await logOut();
    },
  });
}

function useDeleteAccount() {
  // const { logOut } = useAccountActions();

  return useMutation({
    mutationKey: [keys.deleteAccount],
    mutationFn: (id: string | undefined) => deleteAccount(id),
    onError: async (error) => {
      console.error('Error en el servidor:', error);
      // await logOut();
    },
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

  // Usuarios
  useUserRegister,
  useUserLogout,
  useCheckUser,
  useUserData,
  useProfile,
  useAllFavoriteByUser,
  useUpdateBook,
  useDeleteBook,
  useDeleteAccount,
};
