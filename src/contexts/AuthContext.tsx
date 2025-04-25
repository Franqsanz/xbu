import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    // Renovación del token
    async function updateToken(user) {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          window.localStorage.setItem('app_tk', token);
          setToken(token);
        } catch (error) {
          console.error('Error al actualizar el token:', error);
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      updateToken(user);

      if (user) {
        const uid = user?.uid;

        await queryClient.prefetchQuery({
          queryKey: ['UserData', uid],
          queryFn: () => getCheckUser(uid),
        });

        // Obtenemos los datos de la caché
        const data = queryClient.getQueryData(['UserData', uid]);

        // Si los datos están disponibles, los asignamos a userData
        if (data) setUserData(data);
      } else {
        setUserData(null);
      }

      const intervalToken = setInterval(
        () => {
          const currentUser = auth.currentUser;
          updateToken(currentUser);
        },
        40 * 60 * 1000, // 40 minutos
      );

      return () => clearInterval(intervalToken);
    });

    return () => unsubscribe();
  }, [queryClient]);

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
