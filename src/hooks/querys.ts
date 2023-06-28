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
  return useMutation([keys.postBook], postBook);
}

function useAllBooks() {
  return useQuery([keys.all], () => getAllBooks());
}

function useAllSearchBooks() {
  return useQuery([keys.allSearch], () => getAllSearchBooks(), {
    refetchOnWindowFocus: false,
  });
}

function useAllFilterOptions() {
  return useQuery([keys.filtersOptions], () => getAllFilterOptions(), {
    refetchOnWindowFocus: false,
  });
}

function useBooksPaginate() {
  return useInfiniteQuery(
    [keys.paginate],
    ({ pageParam = 0 }) => getBooksPaginate(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.info.nextPage === null) return;
        return lastPage.info.nextPage;
      },
    },
  );
}

function useFilter(query: string | undefined, param: string | undefined) {
  return useQuery(
    [keys.filter, query, param],
    () => getBooksFilter(query, param),
    {
      suspense: true,
      cacheTime: 3000,
    },
  );
}

function useRelatedPost() {
  return useQuery([keys.random], () => getRelatedPost(), {
    suspense: true,
    refetchOnWindowFocus: false,
    cacheTime: 3000,
    staleTime: 60000,
  });
}

function useBook(pathUrl: string | undefined) {
  return useQuery([keys.one, pathUrl], () => getBook(pathUrl), {
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
