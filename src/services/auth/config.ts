import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  browserLocalPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESS_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// Usamos `initializeAuth` en vez de `getAuth` para NO registrar el
// popupRedirectResolver por defecto. Ese resolver monta el iframe de
// __/auth/iframe.js (+ gapi + getProjectConfig) en cada carga de la app para
// escuchar resultados de signInWithRedirect, que no usamos: son ~90 KB y dos
// round trips en el camino crítico antes de poder pintar nada.
// El resolver se pasa a mano en signInWithPopup, que es el único que lo necesita.
export const logIn = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});
logIn.languageCode = 'es';
