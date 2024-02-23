import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { AuthContextType, AuthProviderType } from '@components/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderType) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const auth = getAuth();

  useEffect(() => {
    // Renovación del token
    async function updateToken(user) {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          window.localStorage.setItem('app_tk', token);
          setToken(token);
          // document.cookie = `app_tk=${token}; SameSite=None; path=/;`;
        } catch (error) {
          console.error('Error al actualizar el token:', error);
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      updateToken(user);

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
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
