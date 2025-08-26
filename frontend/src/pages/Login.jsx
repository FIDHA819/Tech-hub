import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../components/AuthContext";

export default function Login() {
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/auth/login", { email, password }); // cookie set
      await fetchUser(); // update context
      navigate("/", { replace: true });
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#111827", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#1f2937", padding: "32px", borderRadius: "12px", color: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Welcome Back</h2>
        {message && <p style={{ color: "#f87171", textAlign: "center", marginBottom: "15px" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#fff" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#fff" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "12px", background: "#3b82f6", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem" }}>
          Don’t have an account? <Link to="/signup" style={{ color: "#60a5fa" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
