export async function fetchData(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    credentials?: any;
  } = {},
): Promise<any> {
  try {
    const headers = options.headers || {};

    headers['X-Api-Key'] = import.meta.env.VITE_XB_API_KEY;

    // Actualizar las options
    const updatedOptions = {
      ...options,
      headers,
    };

    const res = await fetch(url, updatedOptions);

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

    throw new Error('Error desconocido');
  }
}
