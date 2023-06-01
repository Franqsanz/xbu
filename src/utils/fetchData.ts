export async function fetchData(url: string, options = {}): Promise<any> {
  const res = await fetch(url, options);

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(`Error en la solicitud: ${res.status}`);
  }
}
