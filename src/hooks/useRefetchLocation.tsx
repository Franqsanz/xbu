import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useRefetchLocation(currentBookId, data, refetch) {
  const location = useLocation();
  const [previousPathname, setPreviousPathname] = useState(location.pathname);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const filteredBooks = data.filter((book) => {
      return book.pathUrl !== currentBookId;
    });

    setRelatedBooks(filteredBooks);

    if (location.pathname !== previousPathname) {
      refetch();
      setPreviousPathname(location.pathname);
    }
  }, [data, currentBookId, location.pathname, refetch, previousPathname]);

  return relatedBooks;
}
