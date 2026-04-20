import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { logIn } from '@services/auth/config';
import { useAuth } from '@contexts/AuthContext';
import { useUserLogout, useDeleteAccount } from '@hooks/queries';

export function useAccountActions() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const logoutMutation = useUserLogout();
  const deleteAccountMutation = useDeleteAccount();

  async function logOut() {
    try {
      await logoutMutation.mutateAsync();
      queryClient.clear();
      await signOut(logIn);
      window.location.href = '/explore';
    } catch (err) {
      try {
        await signOut(logIn);
        queryClient.clear();
        window.location.href = '/explore';
      } catch (err) {
        window.location.href = '/explore';
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
      navigate('/login', { replace: true });
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
