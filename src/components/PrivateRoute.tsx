import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';
import { SkeletonMain } from '@components/skeletons/SkeletonMain';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <SkeletonMain />;
  }

  return currentUser ? <>{children}</> : <Navigate to='/login' />;
}
