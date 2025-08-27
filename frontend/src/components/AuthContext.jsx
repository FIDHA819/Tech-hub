import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me"); // cookie sent automatically
      setUser(res.data.user);
    } catch {
      setUser(null); // 401 or error sets user to null
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}