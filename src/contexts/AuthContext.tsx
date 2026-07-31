import React, {
  Suspense,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';

import { AuthContextType, AuthProviderType } from '@components/types';
import { getCheckUser } from '@services/api';
import { logIn } from '@services/auth/config';
import { keys } from '@utils/utils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderType) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  // Reusamos la instancia de @services/auth/config: `getAuth()` re-registraría
  // el popupRedirectResolver por defecto (el iframe que sacamos del camino
  // crítico) y además tira `auth/already-initialized`.
  const auth = logIn;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      startTransition(() => {
        setCurrentUser(user);
        setAuthResolved(true);
      });
    });
    return () => unsubscribe();
  }, [auth]);

  // Sincronización cross-tab: cuando otra pestaña completa el sign-in o el
  // registro, esta pestaña se recarga para reflejar el nuevo estado sin que
  // el usuario quede con dos flujos abiertos en paralelo.
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel('xbureads-auth');
    channel.onmessage = (event) => {
      if (event.data === 'auth-updated') {
        window.location.reload();
      }
    };
    return () => channel.close();
  }, []);

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: [keys.userData, currentUser?.uid],
    queryFn: getCheckUser,
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const loading = !authResolved || (!!currentUser && userDataLoading);

  useEffect(() => {
    if (loading) return;
    const splash = document.getElementById('splash');
    if (!splash) return;
    // Doble rAF para esperar al primer paint de los children y evitar
    // un flash blanco si algún componente lazy todavía está suspendido.
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        splash.classList.add('hidden');
        setTimeout(() => splash.remove(), 250);
      });
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, [loading]);

  const value: AuthContextType = {
    currentUser,
    userData: userData ?? null,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : <Suspense fallback={null}>{children}</Suspense>}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
