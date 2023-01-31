import { API_URL, URL_CLOUDINARY } from '../config';

async function getAllBooks() {
  const res = await fetch(API_URL);
  return res.json();
}

async function getBook(id: string | undefined) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

async function uploadImage(image: any) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'xbu-uploads');

  const imageResponse = await fetch(URL_CLOUDINARY, {
    method: 'POST',
    body: formData,
  });

  return await imageResponse.json();
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

async function getBookCategory(category: any) {
  const res = await fetch(`${API_URL}?category=${category}`);

  if (res.ok) return await res.json();
}

async function getRelatedPost() {
  const res = await fetch(`${API_URL}/related-post`);

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
  getBook,
  getBookCategory,
  getRelatedPost,
  uploadImage,
  postBook,
  deleteBook,
};
