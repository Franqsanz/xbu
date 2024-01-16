import React from 'react';

import { AllBooks } from '@components/AllBooks';
import { ContainerTitle } from '@components/ContainerTitle';
import { MySliderCategories } from '@components/MySliderCategories';
import { MainHead } from '@components/Head';

export default function Explore() {
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
