import { API_URL_PROD, API_URL_DEV } from '../config';

async function getAllBooks() {
  // const res = await fetch(API_URL_DEV);
  const res = await fetch(API_URL_PROD);
  return res.json();
}

async function getBook(id: string | undefined) {
  // const res = await fetch(API_URL_DEV);
  const res = await fetch(`${API_URL_PROD}/${id}`);
  return res.json();
}

async function postBook(books: any) {
  // const formData = new FormData();
  // formData.append('file', books.image);
  // formData.append('upload_preset', 'your_upload_preset');

  // // Upload image to cloudinary
  // const imageResponse = await fetch(
  //   'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
  //   {
  //     method: 'POST',
  //     body: formData,
  //   },
  // );
  // const imageData = await imageResponse.json();

  // books.image = {
  //   url: imageData.url,
  //   id: imageData.public_id,
  // };

  // const res = await fetch(API_URL_DEV, {
  const res = await fetch(API_URL_PROD, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(books),
  });

  if (res.ok) return await res.json();
  throw new Error('Error al publicar el libro');
}

async function getBookCategory(category: any) {
  const res = await fetch(
    `${API_URL_PROD}?category=${category}`,
    // `${API_URL_DEV}?category=${category}`,
  );

  if (res.ok) return await res.json();
}

async function getRelatedPost() {
  const res = await fetch(`${API_URL_PROD}/related-post`);

  if (res.ok) return await res.json();
}

async function deleteBook(id: any) {
  // const res = await fetch(API_URL_DEV, {
  const res = await fetch(`${API_URL_PROD}/${id}`, {
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
  postBook,
  deleteBook,
};
