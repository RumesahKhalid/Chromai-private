// providers/AuthProvider.tsx
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

type AuthCtx = {
  user: User | null;
  initializing: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  initializing: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return sub;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
