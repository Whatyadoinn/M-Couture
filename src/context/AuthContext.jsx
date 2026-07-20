import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for auth state
  useEffect(() => {
    setUser(null);
    setUserProfile(null);
    setIsAdmin(false);
    setLoading(false);
  }, []);

  // Sign up with email/password
  const signUp = async (email, password, displayName) => {
    throw new Error("Backend is disabled.");
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    throw new Error("Backend is disabled.");
  };

  // Google sign in
  const signInWithGoogle = async () => {
    throw new Error("Backend is disabled.");
  };

  // Sign out
  const signOut = () => {};

  // Reset password
  const resetPassword = async (email) => { throw new Error("Backend is disabled."); };

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
