// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from 'react';
// import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// interface AuthContextProps {
//   currentUser: User | null;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
//   }

//   return context;
// }

// function AuthProvider({ children }: AuthProviderProps) {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });

//     // Limpia el evento cuando el componente se desmonta
//     return () => unsubscribe();
//   }, [auth]);

//   const value: AuthContextProps = {
//     currentUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export { useAuth, AuthProvider };

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextProps {
  currentUser: User | null;
  isAuthenticated: boolean; // Nueva propiedad para indicar si el usuario está autenticado
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado para indicar si el usuario está autenticado
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user); // Actualiza el estado de autenticación
    });

    // Limpia el evento cuando el componente se desmonta
    return () => unsubscribe();
  }, [auth]);

  const value: AuthContextProps = {
    currentUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
