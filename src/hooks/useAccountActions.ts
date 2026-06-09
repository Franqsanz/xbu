import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { logIn } from '@services/auth/config';
import { useAuth } from '@contexts/AuthContext';
import { useUserLogout, useDeleteAccount } from '@hooks/queries';
import { useLoginModalStore } from '@store/useLoginModalStore';

export function useAccountActions() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const logoutMutation = useUserLogout();
  const deleteAccountMutation = useDeleteAccount();
  const setSuppressLoginModal = useLoginModalStore((s) => s.setSuppress);

  async function logOut() {
    setSuppressLoginModal(true);
    try {
      await logoutMutation.mutateAsync();
      queryClient.clear();
      await signOut(logIn);
      window.location.href = '/';
    } catch (err) {
      try {
        await signOut(logIn);
        queryClient.clear();
        window.location.href = '/';
      } catch (err) {
        window.location.href = '/';
      }
    }
  }

  async function deleteAccount() {
    try {
      if (currentUser?.uid) {
        await deleteAccountMutation.mutateAsync(currentUser.uid);
        window.location.href = '/';
      }
    } catch (err) {
      navigate('/', { replace: true });
    }
  }

  return {
    logOut,
    deleteAccount,
    isLoggingOut: logoutMutation.isPending,
    isPending: deleteAccountMutation.isPending,
    error: deleteAccountMutation.error,
  };
}
