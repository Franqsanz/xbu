import React from 'react';

import { FormNewBook } from '@components/forms/NewBook';
import { MainHead } from '@components/layout/Head';
import { ContainerTitle } from '@components/layout/ContainerTitle';

export default function NewBook() {
  return (
    <>
      <MainHead title='Nueva Publicación' />
      <ContainerTitle title='¡Publicar!' />
      <FormNewBook />
    </>
  );
}
