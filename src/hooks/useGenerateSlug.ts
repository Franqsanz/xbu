import { useEffect } from 'react';
import { generatePathUrl } from '@utils/utils';

/**
 * Genera el pathUrl (slug) en base al título.
 *
 * - En creación (sin `originalTitle`): regenera cada vez que cambia el título.
 * - En edición (con `originalTitle`): solo regenera si el título realmente cambió
 *   respecto al original. Si el usuario edita otros campos sin tocar el título,
 *   se preserva el slug existente para no romper la URL del detalle.
 */
export function useGenerateSlug(
  title: string,
  setBooks: (updater: (prev: any) => any) => void,
  originalTitle?: string,
) {
  useEffect(() => {
    if (originalTitle !== undefined && title === originalTitle) {
      return;
    }
    const generatedPathUrl = generatePathUrl(title);
    setBooks((books) => ({ ...books, pathUrl: generatedPathUrl }));
  }, [title, setBooks, originalTitle]);
}
