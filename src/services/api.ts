import { API_URL } from '../config';
import { fetchData } from '@utils/fetchData';

async function getAllBooks() {
  return await fetchData(API_URL);
}

async function getAllSearchBooks(book: string) {
  return await fetchData(`${API_URL}/books/search?q=${book}`);
}

async function getBooksPaginate(page: number | undefined) {
  return await fetchData(`${API_URL}/books?limit=10&page=${page}`);
}

async function getBook(pathUrl: string | undefined, token?: string | null) {
  const headers = new Headers();
  headers.append('content-type', 'application/json');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return await fetchData(`${API_URL}/books/path/${pathUrl}`, {
    method: 'GET',
    headers: Object.fromEntries(headers),
  });
}

async function getBooksFilterPaginated(
  query: string | undefined,
  param: string | undefined,
  page: number | undefined,
) {
  return await fetchData(`${API_URL}/books?${query}=${param}&limit=10&page=${page}`);
}

async function getBooksFilter(query: string | undefined, param: string | undefined) {
  return await fetchData(`${API_URL}/books?${query}=${param}`);
}

async function getMostViewedBooks(query: string) {
  return await fetchData(`${API_URL}/books/most-viewed-books?detail=${query}`);
}

async function getMoreBooks(id: string | undefined) {
  return await fetchData(`${API_URL}/books/more-books/${id}`);
}

async function getRelatedBooks(id: string | undefined) {
  return await fetchData(`${API_URL}/books/related-books/${id}`);
}

async function getMoreBooksAuthors(id: string | undefined) {
  return await fetchData(`${API_URL}/books/more-books-authors/${id}`);
}

async function getAllFilterOptions() {
  return await fetchData(`${API_URL}/books/options`);
}

async function patchToggleFavorite(
  userId: string | undefined,
  body: any,
  isFavorite: boolean,
) {
  return await fetchData(`${API_URL}/users/favorites`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, id: body, isFavorite }),
  });
}

async function getFindAllCollections(userId: string | undefined) {
  return await fetchData(`${API_URL}/users/collections/${userId}`);
}

async function getCollectionsForUser(userId: string | undefined, bookId: string) {
  return await fetchData(`${API_URL}/users/collections/${userId}/summary/${bookId}`);
}

async function postCollections(userId: string | undefined, body: any) {
  return await fetchData(`${API_URL}/users/collections/${userId}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: body }),
  });
}

async function patchToggleBookInCollection(
  userId: string | undefined,
  collections: Array<{
    collectionId: string;
    collectionName: string;
    isInCollection: boolean;
  }>,
  bookId: string,
  checked: boolean,
) {
  return await fetchData(`${API_URL}/users/collections/books/toggle`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userId,
      collections,
      bookId,
      checked,
    }),
  });
}

async function patchCollectionsName(
  userId: string | undefined,
  collectionId: string | undefined,
  name: string,
) {
  return await fetchData(`${API_URL}/users/collections/collection/${collectionId}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, name }),
  });
}

async function deleteCollections(
  id: string | undefined,
  collectionId: string | undefined,
) {
  return await fetchData(
    `${API_URL}/users/collections/${id}/collection/${collectionId}`,
    {
      method: 'DELETE',
    },
  );
}

async function getFindOneCollection(collectionsId: string | undefined) {
  return await fetchData(`${API_URL}/users/collections/collection/${collectionsId}`);
}

async function patchRemoveBookFromCollection(
  userId: string | undefined,
  collectionId: string,
  bookId: string,
) {
  return await fetchData(`${API_URL}/users/collections/remove`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userId,
      collectionId,
      bookId,
    }),
  });
}

async function postBook(books: any) {
  return await fetchData(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });
}

async function updateBook(id: string | undefined, books: any) {
  return await fetchData(`${API_URL}/books/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });
}

async function deleteBook(id: string | undefined) {
  return await fetchData(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  });
}

// Usuarios

async function postRegister(token: string, body: any) {
  return await fetchData(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username: body }),
  });
}

async function postLogout(token: string | undefined) {
  return await fetchData(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });
}

async function getCheckUser(id: string | undefined) {
  return await fetchData(`${API_URL}/users/check-user/${id}`);
}

async function getUserAndBooks(
  username: string | undefined,
  userId: string | undefined,
  token: string | null,
  page: number | undefined,
) {
  return await fetchData(
    `${API_URL}/users/${userId}/${username}/books?limit=10&page=${page}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

async function getFindAllBookFavorite(userId: string | undefined, page: number) {
  return await fetchData(
    `${API_URL}/users/favorites/${userId}?limit=10&page=${page}`,
  );
}

async function getFindAllComments(bookId: string) {
  return await fetchData(
    `${API_URL}/users/comments/book-comments/${bookId}?limit=5&offset=0`,
  );
}

async function postComment(
  text: string,
  author: {
    userId: string | undefined;
    username: string | null | undefined;
  },
  bookId: string,
) {
  return await fetchData(`${API_URL}/users/comments/comment`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      author,
      bookId,
    }),
  });
}

async function deleteAccount(id: string | undefined) {
  return await fetchData(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
}

export {
  getAllBooks,
  getAllSearchBooks,
  getBooksPaginate,
  getBook,
  getBooksFilterPaginated,
  getBooksFilter,
  getAllFilterOptions,
  getMoreBooks,
  getMostViewedBooks,
  getRelatedBooks,
  getMoreBooksAuthors,
  patchToggleFavorite,
  getCollectionsForUser,
  getFindAllCollections,
  postCollections,
  patchToggleBookInCollection,
  patchCollectionsName,
  patchRemoveBookFromCollection,
  deleteCollections,
  getFindOneCollection,
  postBook,
  deleteBook,
  updateBook,
  getFindAllComments,
  postComment,
  // Usuarios
  postRegister,
  postLogout,
  getCheckUser,
  getUserAndBooks,
  getFindAllBookFavorite,
  deleteAccount,
};
