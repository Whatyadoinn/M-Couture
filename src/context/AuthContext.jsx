import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Mock admin credentials (frontend-only demo)
const ADMIN_EMAIL = "admin@mcouture.in";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_auth");
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setUserProfile(parsed.userProfile);
        setIsAdmin(parsed.isAdmin);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const persistAuth = (u, profile, admin) => {
    localStorage.setItem("mc_auth", JSON.stringify({ user: u, userProfile: profile, isAdmin: admin }));
  };

  // Sign up (mock)
  const signUp = async (_email, _password, displayName) => {
    const mockUser = { uid: "user-" + Date.now(), email: _email };
    const profile = { displayName, email: _email, phone: "" };
    setUser(mockUser);
    setUserProfile(profile);
    setIsAdmin(false);
    persistAuth(mockUser, profile, false);
  };

  // Sign in (mock — recognises admin credentials)
  const signIn = async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { uid: "admin-001", email: ADMIN_EMAIL };
      const profile = { displayName: "Admin", email: ADMIN_EMAIL, phone: "" };
      setUser(adminUser);
      setUserProfile(profile);
      setIsAdmin(true);
      persistAuth(adminUser, profile, true);
      return;
    }
    // Any other email/password combo → regular user
    const mockUser = { uid: "user-" + Date.now(), email };
    const profile = { displayName: email.split("@")[0], email, phone: "" };
    setUser(mockUser);
    setUserProfile(profile);
    setIsAdmin(false);
    persistAuth(mockUser, profile, false);
  };

  // Google sign in (mock)
  const signInWithGoogle = async () => {
    const mockUser = { uid: "google-" + Date.now(), email: "user@gmail.com" };
    const profile = { displayName: "Google User", email: "user@gmail.com", phone: "" };
    setUser(mockUser);
    setUserProfile(profile);
    setIsAdmin(false);
    persistAuth(mockUser, profile, false);
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    setUserProfile(null);
    setIsAdmin(false);
    localStorage.removeItem("mc_auth");
  };

  // Reset password (mock)
  const resetPassword = async (_email) => {
    // no-op in frontend-only mode
  };

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
