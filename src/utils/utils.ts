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
  const formattedName = name.toLowerCase().replace(/\.|\//g, '');
  const dashedName = formattedName.replace(/\s+/g, '-');
  const randomId = nanoid(4);

  return `${dashedName}-${randomId}`;
}

export { keys, handleImageLoad, generatePathUrl };
