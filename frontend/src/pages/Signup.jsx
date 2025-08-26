import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../components/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.name || !form.email || !form.password) {
      setMsg({ type: "error", text: "All fields are required." });
      return;
    }
    if (form.password.length < 6) {
      setMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", form); // cookie set by backend
      await fetchUser(); // update AuthContext with logged-in user
      navigate("/", { replace: true });
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#111827", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#1f2937", padding: "32px", borderRadius: "12px", color: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Create Your Account</h2>
        {msg.text && (
          <p style={{ color: msg.type === "error" ? "#f87171" : "#22c55e", textAlign: "center", marginBottom: "15px" }}>
            {msg.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#fff" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#fff" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#fff" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#3b82f6", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: loading ? "default" : "pointer" }}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem" }}>
          Already have an account? <a href="/login" style={{ color: "#60a5fa" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
