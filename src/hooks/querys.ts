import { useQuery, useMutation } from '@tanstack/react-query';

import {
  getAllBooks,
  getBook,
  getBookCategory,
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

function useCategory(category: any) {
  return useQuery([keys.category, category], () => getBookCategory(category), {
    suspense: true,
    cacheTime: 3000,
  });
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

export { useMutatePost, useAllBooks, useBook, useCategory, useRelatedPost };
