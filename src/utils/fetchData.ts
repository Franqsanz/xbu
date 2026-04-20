export async function fetchData(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    credentials?: RequestCredentials;
  } = {},
): Promise<any> {
  try {
    const headers: Record<string, string> = {
      ...(options.headers || {}),
      'X-Api-Key': import.meta.env.VITE_XB_API_KEY,
    };

    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const updatedOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    const res = await fetch(url, updatedOptions);

    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        console.error('Se perdió la conexión');
      } else {
        console.error('Error en la solicitud:', error.message);
      }
    }

    throw error;
  }
}
