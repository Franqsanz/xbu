import React from 'react';

import { AllBooks } from '@components/AllBooks';
import { ContainerTitle } from '@components/layout/ContainerTitle';
import { MySliderCategories } from '@components/ui/MySliderCategories';
import { MainHead } from '@components/layout/Head';

export function Explore() {
  return (
    <>
      <MainHead
        title='Explorar | XBuniverse'
        description='¡Explora cientos de libros!'
      />
      <ContainerTitle title='Explorar' />
      <MySliderCategories />
      <AllBooks />
    </>
  );
}
