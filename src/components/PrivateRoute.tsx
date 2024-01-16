import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../store/AuthContext';
import { SkeletonAllBooks } from '@components/skeletons/SkeletonABooks';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <SkeletonAllBooks />;
  }

  return currentUser ? <>{children}</> : <Navigate to='/login' />;
}
