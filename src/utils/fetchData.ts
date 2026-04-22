import { API_URL } from '../config';
import { logIn } from '@services/auth/config';

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let pendingRequests: PendingRequest[] = [];

function resolvePendingRequests(success: boolean, error?: Error) {
  pendingRequests.forEach((req) => {
    if (success) {
      req.resolve(undefined);
    } else {
      req.reject(error);
    }
  });
  pendingRequests = [];
}

async function refreshToken(): Promise<boolean> {
  try {
    const auth = logIn;
    const currentUser = auth.currentUser;

    // Si no hay usuario logeado en Firebase, no hay nada que refrescar
    if (!currentUser) {
      window.location.href = '/login';
      return false;
    }

    // Obtén un nuevo idToken fresco de Google
    const newIdToken = await currentUser.getIdToken(true);

    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_XB_API_KEY,
      },
      body: JSON.stringify({ idToken: newIdToken }),
    });

    if (res.ok) {
      return true;
    }

    // Si el refresh falla, redirige al login
    if (res.status === 401) {
      window.location.href = '/login';
    }

    return false;
  } catch (error) {
    console.error('Error refrescando token:', error);
    window.location.href = '/login';
    return false;
  }
}

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

    let res = await fetch(url, updatedOptions);

    // Manejo de 401 - intenta refrescar el token SOLO si hay usuario logeado
    if (res.status === 401) {
      const auth = logIn;
      const currentUser = auth.currentUser;

      // Si no hay usuario logeado, redirige directamente sin intentar refrescar
      if (!currentUser) {
        window.location.href = '/login';
        return null;
      }

      if (isRefreshing) {
        // Si ya está refrescando, espera a que termine
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        }).then(() => {
          // Reintenta la solicitud después del refresh
          return fetchData(url, options);
        });
      }

      isRefreshing = true;

      try {
        const refreshed = await refreshToken();

        if (refreshed) {
          // Reintenta la solicitud original
          res = await fetch(url, updatedOptions);
          resolvePendingRequests(true);
        } else {
          resolvePendingRequests(false, new Error('Token refresh failed'));
          return null;
        }
      } catch (error) {
        isRefreshing = false;
        resolvePendingRequests(false, error as Error);
        throw error;
      } finally {
        isRefreshing = false;
      }
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
