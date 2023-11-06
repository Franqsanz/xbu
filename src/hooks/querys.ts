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
  getRelatedBooks,
  postBook,
} from '../services/api';
import { keys } from '../utils/utils';
import { BookType } from '../components/types';

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
  });
}

function useAllFilterOptions() {
  return useQuery({
    queryKey: [keys.filtersOptions],
    queryFn: getAllFilterOptions,
    refetchOnWindowFocus: false,
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
  });
}

function useFilter(query: string | undefined, param: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.filter, query, param],
    queryFn: () => getBooksFilter(query, param),
    gcTime: 3000,
  });
}

function useMoreBooks() {
  return useSuspenseQuery({
    queryKey: [keys.random],
    queryFn: getMoreBooks,
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
  });
}

function useRelatedBooks(id: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.relatedBooks, id],
    queryFn: () => getRelatedBooks(id),
    refetchOnWindowFocus: false,
    gcTime: 3000,
    staleTime: 50000,
  });
}

function useBook(pathUrl: string | undefined) {
  return useSuspenseQuery({
    queryKey: [keys.one, pathUrl],
    queryFn: () => getBook(pathUrl),
    refetchOnWindowFocus: false,
    gcTime: 3000,
  });
}

export {
  useMutatePost,
  useAllFilterOptions,
  useAllBooks,
  useAllSearchBooks,
  useBooksPaginate,
  useBook,
  useFilter,
  useMoreBooks,
  useRelatedBooks,
};
