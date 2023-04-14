import { API_URL } from '../config';

async function getAllBooks() {
  const res = await fetch(API_URL);

  if (res.ok) return await res.json();
}

async function getBooksPaginate(page: number | undefined) {
  const res = await fetch(`${API_URL}?limit=10&page=${page}`);

  if (res.ok) return await res.json();
}

async function getBook(id: string | undefined) {
  const res = await fetch(`${API_URL}/${id}`);

  if (res.ok) return await res.json();
}

async function postBook(books: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });

  if (res.ok) return await res.json();
  throw new Error('Error al publicar el libro');
}

async function getBooksFilter(
  query: string | undefined,
  param: string | undefined,
) {
  const res = await fetch(`${API_URL}?${query}=${param}`);

  if (res.ok) return await res.json();
}

async function getRelatedPost() {
  const res = await fetch(`${API_URL}/related-post`);

  if (res.ok) return await res.json();
}

async function getAllCategories() {
  const res = await fetch(`${API_URL}/categories`);

  if (res.ok) return await res.json();
}

async function deleteBook(id: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('error');
  }

  return true;
}

export {
  getAllBooks,
  getBooksPaginate,
  getBook,
  getBooksFilter,
  getAllCategories,
  getRelatedPost,
  postBook,
  deleteBook,
};
