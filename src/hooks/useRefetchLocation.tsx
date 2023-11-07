import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RelatedBooksType } from '../components/types';

type Book = {
  pathUrl: string;
};

export function useRefetchLocation({
  currentBookId,
  data,
  refetch,
}: RelatedBooksType) {
  const location = useLocation();
  const pathname = location.pathname;
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);

  useEffect(() => {
    const filteredBooks = data.filter((book: Book) => {
      if (book.pathUrl === currentBookId) {
        if (refetch !== undefined) {
          refetch();
        }
      }

      return book.pathUrl !== currentBookId;
    });

    setRelatedBooks(filteredBooks);

    if (pathname !== previousPathname) {
      if (refetch !== undefined) {
        refetch();
      }
      setPreviousPathname(pathname);
    }
  }, [data, currentBookId, pathname, refetch, previousPathname]);

  return relatedBooks;
}
