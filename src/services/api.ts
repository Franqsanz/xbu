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
    headers,
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

async function getMoreBooks() {
  return await fetchData(`${API_URL}/books/more-books`);
}

async function getMostViewedBooks(query: string) {
  return await fetchData(`${API_URL}/books/most-viewed-books?detail=${query}`);
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

async function updateFavoriteStatus(id: string | undefined, body: any) {
  return await fetchData(`${API_URL}/books/favorite/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, isFavorite: body }),
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
    `${API_URL}/users/${userId}/${username}/my-books?limit=10&page=${page}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
  updateFavoriteStatus,
  postBook,
  deleteBook,
  updateBook,
  // Usuarios
  postRegister,
  getCheckUser,
  getUserAndBooks,
  deleteAccount,
};
