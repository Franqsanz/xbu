import React from 'react';

import { RelatedCard } from './RelatedCard';
import { ContainerRCard } from './ContainerRCard';
import { CardType, ReleatedBooksType } from '../types';
import { useMoreBooks } from '../../hooks/querys';
import { useRefetchLocation } from '../../hooks/useRefetchLocation';

export default function MoreBooks({ currentBookId }: ReleatedBooksType) {
  const { data, refetch } = useMoreBooks();
  const moreBooks = useRefetchLocation(currentBookId, data, refetch);

  return (
    <>
      <ContainerRCard>
        {moreBooks.map(({ id, title, authors, pathUrl }: CardType) => (
          <React.Fragment key={id}>
            <RelatedCard
              title={title}
              authors={authors}
              pathUrl={pathUrl}
              refetchQueries={refetch}
            />
          </React.Fragment>
        ))}
      </ContainerRCard>
    </>
  );
}
