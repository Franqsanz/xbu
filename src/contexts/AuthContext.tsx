import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { useQueryClient } from '@tanstack/react-query';
import { AuthContextType, AuthProviderType } from '@components/types';
import { getCheckUser } from '@services/api';
import { SplashScreen } from '@components/ui/SplashScreen';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderType) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const auth = getAuth();
  const [userData, setUserData] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const tokenIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function updateToken(user: User | null) {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          window.localStorage.setItem('app_tk', token);
          setToken(token);
        } catch (error) {
          // Si hay error de red, intentar usar el token del localStorage
          const storedToken = window.localStorage.getItem('app_tk');
          if (storedToken) {
            setToken(storedToken);
          }
        }
      } else {
        // Si no hay usuario, limpiar token
        window.localStorage.removeItem('app_tk');
        setToken('');
      }
    }

    // Limpiar intervalo anterior si existe
    if (tokenIntervalRef.current) {
      clearInterval(tokenIntervalRef.current);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await updateToken(user);

      if (user) {
        const uid = user?.uid;

        try {
          await queryClient.prefetchQuery({
            queryKey: ['UserData', uid],
            queryFn: () => getCheckUser(uid),
          });

          // Obtenemos los datos de la caché
          const data = queryClient.getQueryData(['UserData', uid]);

          // Si los datos están disponibles, los asignamos a userData
          if (data) setUserData(data);
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    // Configurar intervalo para renovar token (solo una vez)
    tokenIntervalRef.current = setInterval(
      async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          await updateToken(currentUser);
        }
      },
      40 * 60 * 1000, // 40 minutos
    );

    return () => {
      unsubscribe();
      if (tokenIntervalRef.current) {
        clearInterval(tokenIntervalRef.current);
      }
    };
  }, [queryClient, auth]);

  // Cargar token del localStorage al iniciar
  useEffect(() => {
    const storedToken = window.localStorage.getItem('app_tk');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    token,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <SplashScreen /> : children}
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
