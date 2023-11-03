import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useRefetchLocation(currentBookId, data, refetch) {
  const location = useLocation();
  const pathname = location.pathname;
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const filteredBooks = data.filter((book) => {
      return book.pathUrl !== currentBookId;
    });

    setRelatedBooks(filteredBooks);

    if (pathname !== previousPathname) {
      refetch();
      setPreviousPathname(pathname);
    }
  }, [data, currentBookId, pathname, refetch, previousPathname]);
  return relatedBooks;
}
