// import { useNavigate } from 'react-router-dom';
import {
  // getAuth,
  signOut,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  // signInWithCredential,
} from 'firebase/auth';

import { logIn } from '@services/auth/config';
import { useAuth } from '@contexts/AuthContext';
import { useUserLogout } from '@hooks/queries';
// import { useDeleteAccount } from '@hooks/queries';

export function useAccountActions() {
  // const navigate = useNavigate();
  const { currentUser, token } = useAuth();
  const { mutate, isPending, error } = useUserLogout();
  // const { mutate } = useDeleteAccount();
  // const auth = getAuth();

  async function logOut() {
    try {
      if (token) {
        await mutate(token);
      }

      await signOut(logIn);
      await window.localStorage.removeItem('app_tk');
    } catch (err) {
      window.localStorage.removeItem('app_tk');
    }
  }
  // const token = await currentUser?.getIdToken();
  // const accessToken = await currentUser?.getIdToken(true);
  // const credential = GoogleAuthProvider.credential(token, accessToken);
  // await reauthenticateWithCredential(currentUser, credential);

  async function deleteAccount() {
    try {
      if (currentUser) {
        const idToken = await currentUser?.getIdToken();
        const credential = GoogleAuthProvider.credential(idToken);
        await reauthenticateWithCredential(currentUser, credential);
        await currentUser?.delete();
      }
    } catch (err) {
      console.error('Error al borrar la cuenta:', err);
    }
  }
  // await mutate(uid); // Elimina la cuenta y sus libros de la base de datos
  // await currentUser?.delete(); // Elimina la cuenta de Firebase
  // await signOut(logIn);
  // await window.localStorage.removeItem('app_tk');
  // await navigate('/', { replace: true });

  return { logOut, deleteAccount, isPending, error };
}
