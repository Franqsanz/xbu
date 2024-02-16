import {
  signOut,
  reauthenticateWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

import { logIn } from '@services/auth/config';
import { useAuth } from '@contexts/AuthContext';

export function useAccountActions() {
  const { currentUser } = useAuth();

  async function logOut() {
    try {
      await signOut(logIn);
      await window.localStorage.removeItem('app_tk');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async function deleteAccount() {
    try {
      if (currentUser) {
        // const idToken = await currentUser?.;
        // const credential = GoogleAuthProvider.credential(idToken);

        // await reauthenticateWithCredential(currentUser, credential);
        await currentUser?.delete(); // Elimina la cuenta de Firebase
        await signOut(logIn);
        await window.localStorage.removeItem('app_tk');
      }
    } catch (error) {
      console.error('Error al borrar la cuenta:', error);
    }
  }

  return { logOut, deleteAccount };
}
