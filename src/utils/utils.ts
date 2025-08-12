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
  filterPaginated: 'BooksFilterPaginated',
  filter: 'BooksFilter',
  random: 'BooksRandom',
  relatedBooks: 'RelatedBooks',
  moreBooksAuthors: 'MoreBooksAuthors',
  mostViewed: 'MostViewed',
  favoriteBook: 'FavoriteBook',
  userRegister: 'UserRegister',
  userLogout: 'UserLogout',
  updateBook: 'UpdateBook',
  deleteBook: 'DeleteBook',
  profile: 'Profile',
  checkUser: 'CheckUser',
  userData: 'UserData',
  userFavoriteBooks: 'UserFavoriteBooks',
  createCollections: 'CreateCollections',
  updateCollectionsName: 'UpdateCollectionsName',
  collectionsBooks: 'CollectionsBooks',
  allCollections: 'AllCollections',
  allCollectionsForUser: 'AllCollectionsForUser',
  collectionsDetail: 'CollectionsDetail',
  deleteCollections: 'DeleteCollections',
  deleteCollectionBook: 'DeleteCollectionBook',
  postComment: 'PostComment',
  postReactions: 'PostReactions',
  allComments: 'AllComments',
  deleteAccount: 'DeleteAccount',
};

const currentYear = new Date().getFullYear();

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
    .replace(/[\u0300-\u036f()°º:,]/g, '');
  const withoutDotsName = formattedName.replace(/\.|\//g, '');
  const withoutQuestionMarks = withoutDotsName.replace(/[?¿]/g, '');
  const dashedName = withoutQuestionMarks.replace(/\s+/g, '-');
  const randomId = nanoid(4);

  return `${dashedName}-${randomId}`;
}

// Funcion para verificar si se encuentra en otro idioma que no sea español
function isSpanish(language) {
  const spanishLanguage = ['Español', 'español'];
  const lowerCaseLanguage = language.toLowerCase();
  return spanishLanguage.includes(lowerCaseLanguage);
}

function parseDate(fechaISO: string) {
  const fecha = new Date(fechaISO);

  // Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) return null;

  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatoFecha = new Intl.DateTimeFormat('es-ES', opciones);

  return formatoFecha.format(fecha);
}

function sortArrayByLabel<T extends { label: string }>(array: T[]): T[] {
  return array.slice().sort((a, b) => a.label.localeCompare(b.label));
}

function capitalizeWords(str: string) {
  return str
    .split(' ') // Dividir la cadena por espacios
    .map((word) =>
      word
        .split('.') // Dividir cada palabra por puntos
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalizar cada parte después de un punto
        .join('.'),
    ) // Unir las partes capitalizadas con un punto
    .join(' '); // Unir las palabras capitalizadas con espacios
}

export {
  keys,
  currentYear,
  handleImageLoad,
  useHandleEnterKey,
  generatePathUrl,
  isSpanish,
  parseDate,
  sortArrayByLabel,
  capitalizeWords,
};
