import { useQuery, useMutation } from '@tanstack/react-query';
import { getAllBooks, getBookCategory, postBook } from '../services/api';

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

export { useMutatePost, useAllBooks, useCategory };
