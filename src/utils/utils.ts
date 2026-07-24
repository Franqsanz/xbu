import React from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const keys = {
  all: 'Books',
  postBook: 'PostBook',
  postOriginalBook: 'PostOriginalBook',
  bookReadUrl: 'BookReadUrl',
  bookProgress: 'BookProgress',
  allSearch: 'BooksSearch',
  allSearchUsers: 'UsersSearch',
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
  updateComment: 'UpdateComment',
  deleteComment: 'DeleteComment',
  allComments: 'AllComments',
  commentReplies: 'CommentReplies',
  deleteAccount: 'DeleteAccount',
  followUser: 'FollowUser',
  unfollowUser: 'UnfollowUser',
  followStats: 'FollowStats',
  followers: 'Followers',
  following: 'Following',
  feed: 'Feed',
  bookStatus: 'BookStatus',
  booksByStatus: 'BooksByStatus',
  myBookRating: 'MyBookRating',
  bookRatingStats: 'BookRatingStats',
  checkUsername: 'CheckUsername',
  patchProfile: 'PatchProfile',
  notifications: 'Notifications',
  notificationsUnread: 'NotificationsUnread',
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

function parseDate(
  dateInput: string | Date,
  options?: 'long' | 'short',
): string | null {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return null;

  let formato: Intl.DateTimeFormatOptions;

  if (options === 'short') {
    formato = { day: 'numeric', month: 'short', year: 'numeric' };
  } else {
    formato = { day: 'numeric', month: 'long', year: 'numeric' };
  }

  const formatted = new Intl.DateTimeFormat('es-ES', formato).format(date);

  return options === 'short'
    ? formatted.replace(/(\d{1,2} \w+)\s(\d{4})/, '$1, $2')
    : formatted;
}

function sortArrayByLabel<T extends { label: string }>(array: T[]): T[] {
  return array.slice().sort((a, b) => a.label.localeCompare(b.label));
}

function formatRelativeTime(dateInput: string | Date): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'ahora';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `hace ${diffMin} min`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `hace ${diffHr} h`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `hace ${diffDay} d`;

  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 4) return `hace ${diffWeek} sem`;

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `hace ${diffMonth} mes${diffMonth > 1 ? 'es' : ''}`;

  const diffYear = Math.floor(diffDay / 365);
  return `hace ${diffYear} año${diffYear > 1 ? 's' : ''}`;
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
  formatRelativeTime,
  sortArrayByLabel,
  capitalizeWords,
};
