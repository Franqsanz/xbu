import React from 'react';
import { nanoid } from 'nanoid';

const keys = {
  all: 'Books',
  postBook: 'PostBook',
  allSearch: 'BooksSearch',
  one: 'BookOne',
  filtersOptions: 'BookFiltersOptions',
  paginate: 'BookPaginate',
  filter: 'BooksFilter',
  random: 'BooksRandom',
};

function handleImageLoad(e: React.SyntheticEvent) {
  const target = e.target as HTMLImageElement;
  target.style.filter = 'blur(0)';
}

function generatePathUrl(name) {
  const formattedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const withoutDotsName = formattedName.replace(/\.|\//g, '');
  const dashedName = withoutDotsName.replace(/\s+/g, '-');
  const randomId = nanoid(4);

  return `${dashedName}-${randomId}`;
}

export { keys, handleImageLoad, generatePathUrl };
