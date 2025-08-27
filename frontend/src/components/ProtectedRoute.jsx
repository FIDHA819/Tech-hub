import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me"); // ✅ cookie sent automatically
        setAuth(res.data.user);
      } catch (err) {
        console.error("Auth error: ", err);
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}