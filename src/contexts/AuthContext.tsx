import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

import { AuthContextType, AuthProviderType } from '@components/types';
import { getCheckUser } from '@services/api';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthState = {
  currentUser: User | null;
  userData: any | null;
  loading: boolean;
};

function AuthProvider({ children }: AuthProviderType) {
  const [authState, setAuthState] = useState<AuthState>({
    currentUser: null,
    userData: null,
    loading: true,
  });

  const auth = getAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let userData = null;

      if (user) {
        try {
          const uid = user.uid;

          userData = await queryClient.fetchQuery({
            queryKey: ['UserData', uid],
            queryFn: getCheckUser,
            staleTime: 1000 * 60 * 5,
          });
        } catch (error) {
          // si falla (ej: 401), lo tratamos como no logueado
          userData = null;
        }
      }

      // 🔥 UN SOLO setState → evita múltiples renders
      setAuthState({
        currentUser: user,
        userData,
        loading: false,
      });
    });

    return () => unsubscribe();
  }, [auth, queryClient]);

  useEffect(() => {
    if (!authState.loading) {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.classList.add('hidden');
        setTimeout(() => splash.remove(), 250);
      }
    }
  }, [authState.loading]);

  const value: AuthContextType = {
    currentUser: authState.currentUser,
    userData: authState.userData,
    loading: authState.loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {authState.loading ? null : children}
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
