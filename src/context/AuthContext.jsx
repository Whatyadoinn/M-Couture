import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext(null);
const ADMIN_EMAIL = "mcouture.offical@gmail.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    // Process redirect result if page returned from Google redirect flow
    getRedirectResult(auth).catch((err) => {
      console.warn("Redirect sign-in check:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAdmin(firebaseUser?.email === ADMIN_EMAIL);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
      setUser({ ...userCredential.user, displayName: name });
    }
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        throw err;
      }
      if (err.code === "auth/unauthorized-domain") {
        const domain = window.location.hostname;
        throw new Error(`The domain "${domain}" is not authorized in Firebase Console. Please add "${domain}" under Firebase Console > Authentication > Settings > Authorized domains.`);
      }
      // For IndexedDB errors ("Database is closing/hidden"), popup blockers, cross-origin/browser restrictions, fallback to redirect
      console.warn("Popup sign-in failed/blocked, falling back to redirect:", err);
      await signInWithRedirect(auth, provider);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = { user, isAdmin, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}