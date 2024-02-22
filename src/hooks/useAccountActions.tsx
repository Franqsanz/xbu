import { useNavigate } from 'react-router-dom';
import {
  signOut,
  reauthenticateWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';

import { logIn } from '@services/auth/config';
import { useAuth } from '@contexts/AuthContext';
import { useDeleteAccount } from '@hooks/querys';

export function useAccountActions() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const { mutate } = useDeleteAccount();

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

        await mutate(uid); // Elimina la cuenta y sus libros de la base de datos
        await currentUser?.delete(); // Elimina la cuenta de Firebase
        await signOut(logIn);
        await window.localStorage.removeItem('app_tk');
        await navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error al borrar la cuenta:', error);
    }
  }

  return { logOut, deleteAccount };
}
