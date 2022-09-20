import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getAllBooks,
  getBook,
  getBookCategory,
  postBook,
} from '../services/api';

const key = 'Books';

function useMutatePost() {
  return useMutation([key], postBook);

  // const queryClient = useQueryClient();
  // onSuccess: (post) => {
  //   queryClient.setQueryData([key], (prevPosts) => prevPosts.concat(post));
  //   queryClient.invalidateQueries([key]);
  // },
  // });
}

function useAllBooks() {
  return useQuery([key], () => getAllBooks());
}

function useCategory(category: any) {
  return useQuery([key, category], () => getBookCategory(category), {
    suspense: true,
  });
}

function useBook(id: string) {
  return useQuery([key, id], () => getBook(id), {
    suspense: true,
  });
}

export { useMutatePost, useAllBooks, useBook, useCategory };
