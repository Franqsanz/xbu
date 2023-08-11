export async function fetchData(url: string, options = {}): Promise<any> {
  try {
    const res = await fetch(url, options);

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        console.error('Se perdió la conexión');
      } else {
        console.error('Error en la solicitud:', error.message);
      }

      throw error;
    }

    throw new Error('Error desconocido'); // Re-lanza el error para que pueda ser manejado en el código que llama a fetchData
  }
}
