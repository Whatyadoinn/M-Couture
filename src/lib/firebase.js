import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import {
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Fix for Safari "Database is closing/hidden" error — Safari blocks IndexedDB in
// Private Browsing and with Intelligent Tracking Prevention (ITP) enabled.
// Try LOCAL persistence first, fall back to SESSION, then in-memory.
setPersistence(auth, browserLocalPersistence).catch(() => {
  return setPersistence(auth, browserSessionPersistence).catch(() => {
    return setPersistence(auth, inMemoryPersistence);
  });
});

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;
