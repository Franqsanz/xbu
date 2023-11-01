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
  relatedBooks: 'RelatedBooks',
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

function generatePathUrl(name: string) {
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

// function aboutAuthors(authorNames: string[]) {
//   const authorLinks = authorNames.map((authorName) => {
//     const encodedAuthorName = encodeURIComponent(authorName);
//     return `https://www.google.com/search?q=${encodedAuthorName}+escritor`;
//   });

//   return authorLinks;
// }

// Funcion para verificar si se encuentra en otro idioma que no sea español
function isSpanish(language) {
  const spanishLanguage = ['Español', 'español'];
  const lowerCaseLanguage = language.toLowerCase();
  return spanishLanguage.includes(lowerCaseLanguage);
}

export { keys, handleImageLoad, useHandleEnterKey, generatePathUrl, isSpanish };
