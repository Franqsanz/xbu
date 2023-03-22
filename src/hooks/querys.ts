import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';

import {
  getAllBooks,
  getBooksPaginate,
  getBook,
  getBooksFilter,
  getRelatedPost,
  postBook,
} from '../services/api';
import { keys } from '../utils/utils';

function useMutatePost() {
  return useMutation([keys.all], postBook);

  // const queryClient = useQueryClient();
  // onSuccess: (post) => {
  //   queryClient.setQueryData([key], (prevPosts) => prevPosts.concat(post));
  //   queryClient.invalidateQueries([key]);
  // },
  // });
}

function useAllBooks() {
  return useQuery([keys.all], () => getAllBooks());
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

function useBook(id: string | undefined) {
  return useQuery([keys.one, id], () => getBook(id), {
    suspense: true,
    cacheTime: 3000,
  });
}

export {
  useMutatePost,
  useAllBooks,
  useBooksPaginate,
  useBook,
  useFilter,
  useRelatedPost,
};
