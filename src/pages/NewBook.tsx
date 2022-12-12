import React from 'react';

import { FormNewBook } from '../components/forms/NewBook';
import { MainHead } from '../components/Head';
import { ContainerTitle } from '../components/ContainerTitle';

export function NewBook() {
  return (
    <>
      <MainHead title='Nueva Publicación' />
      <ContainerTitle title='¡Publicar!' />
      <FormNewBook />
    </>
  );
}
