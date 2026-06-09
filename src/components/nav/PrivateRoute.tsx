import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';
import { SkeletonMain } from '@components/skeletons/SkeletonMain';
import { useLoginModalStore } from '@store/useLoginModalStore';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const openLoginModal = useLoginModalStore((s) => s.open);

  useEffect(() => {
    if (!loading && !currentUser) {
      openLoginModal('Necesitás iniciar sesión para acceder a esta sección.');
    }
  }, [loading, currentUser, openLoginModal]);

  if (loading) {
    return <SkeletonMain />;
  }

  return currentUser ? <>{children}</> : <Navigate to='/' replace />;
}
