import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';

import {
  getAllBooks,
  getAllSearchBooks,
  getAllFilterOptions,
  getBooksPaginate,
  getBook,
  getBooksFilter,
  getRelatedPost,
  postBook,
} from '../services/api';
import { keys } from '../utils/utils';

function useMutatePost() {
  return useMutation({ mutationKey: [keys.postBook], mutationFn: postBook });
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
    queryFn: ({ pageParam = 0 }) => getBooksPaginate(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.info.nextPage === null) return;

      return lastPage.info.nextPage;
    },
  });
}

function useFilter(query: string | undefined, param: string | undefined) {
  return useQuery({
    queryKey: [keys.filter, query, param],
    queryFn: () => getBooksFilter(query, param),
    suspense: true,
    cacheTime: 3000,
  });
}

function useRelatedPost() {
  return useQuery({
    queryKey: [keys.random],
    queryFn: getRelatedPost,
    suspense: true,
    refetchOnWindowFocus: false,
    cacheTime: 3000,
    staleTime: 60000,
  });
}

function useBook(pathUrl: string | undefined) {
  return useQuery({
    queryKey: [keys.one, pathUrl],
    queryFn: () => getBook(pathUrl),
    refetchOnWindowFocus: false,
    suspense: true,
    cacheTime: 3000,
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
  useRelatedPost,
};
