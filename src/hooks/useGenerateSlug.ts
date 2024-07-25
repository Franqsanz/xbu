import { useEffect } from 'react';
import { generatePathUrl } from '@utils/utils';

export function useGenerateSlug(title, setBooks) {
  useEffect(() => {
    // Genera el pathUrl (Slug) basado en el título cada vez que se actualiza
    const generatedPathUrl = generatePathUrl(title);
    setBooks((books) => ({ ...books, pathUrl: generatedPathUrl }));
  }, [title, setBooks]);
}
