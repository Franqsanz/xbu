import React from 'react';

import { FormCreateUser } from '@components/forms/FormCreateUser';
import { MainHead } from '@components/Head';

export function CreateUser() {
  return (
    <>
      <MainHead title='Elegir nombre de usuario | XBuniverse' />
      <FormCreateUser />
    </>
  );
}
