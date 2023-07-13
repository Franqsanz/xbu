import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

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

function useHandleEnterKey(pathUrl: string) {
  const navigate = useNavigate();

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      navigate(`/book/view/${pathUrl}`);
    }
  }

  return handleKeyPress;
}

function generatePathUrl(name) {
  const formattedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const withoutDotsName = formattedName.replace(/\.|\//g, '');
  const withoutQuestionMarks = withoutDotsName.replace(/[?¿]/g, '');
  const dashedName = withoutQuestionMarks.replace(/\s+/g, '-');
  const randomId = nanoid(4);

  return `${dashedName}-${randomId}`;
}

export { keys, handleImageLoad, useHandleEnterKey, generatePathUrl };
