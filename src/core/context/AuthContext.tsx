// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { loginRequest, LoginResponse } from "../api/authService";

interface AuthContextProps {
  user: LoginResponse["user"] | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, senha: string) {
    setLoading(true);

    try {
      const data = await loginRequest(email, senha);

      setUser(data.user);
      setToken(data.token);

      await SecureStore.setItemAsync("token", data.token);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    SecureStore.deleteItemAsync("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
