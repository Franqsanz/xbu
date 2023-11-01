import React from 'react';

import { RelatedCard } from './RelatedCard';
import { ContainerRCard } from './ContainerRCard';
import { CardType, ReleatedBooksType } from '../types';
import { useRelatedBooks } from '../../hooks/querys';
import { useRefetchLocation } from '../../hooks/useRefetchLocation';

export default function RelatedBooks({ currentBookId, id }: ReleatedBooksType) {
  const { data, refetch } = useRelatedBooks(id);
  const relatedBooks = useRefetchLocation(currentBookId, data, refetch);

  return (
    <>
      <ContainerRCard>
        {relatedBooks.map(({ id, title, authors, pathUrl }: CardType) => (
          <React.Fragment key={id}>
            <RelatedCard
              id={id}
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
