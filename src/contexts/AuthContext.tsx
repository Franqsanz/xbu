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
  const [userData, setUserData] = useState<any | null>(null);
  const auth = getAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const uid = user?.uid;

        try {
          await queryClient.prefetchQuery({
            queryKey: ['UserData', uid],
            queryFn: getCheckUser,
          });

          const data = queryClient.getQueryData(['UserData', uid]);
          if (data) setUserData(data);
        } catch (error) {
          // silent fail on user data load
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, auth]);

  const value: AuthContextType = {
    currentUser,
    loading,
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
