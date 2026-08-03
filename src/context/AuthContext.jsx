import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

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
      // Update local state immediately so it reflects without reloading
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
      if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") {
        console.warn("Popup blocked or cancelled, falling back to redirect sign-in...");
        await signInWithRedirect(auth, provider);
      } else {
        throw err;
      }
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