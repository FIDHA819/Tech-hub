import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const navStyle = {
    display: "flex",
    justifyContent: "center", // center all items
    alignItems: "center",
    padding: "12px 0",
    background: "linear-gradient(90deg, #0f0f0f, #1a1a1a)",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    gap: "30px", // space between all items
    flexWrap: "wrap", // wrap on small screens
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "18px", // bigger text
    transition: "all 0.2s ease",
  };

  const buttonStyle = {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #22d3ee)",
    color: "white",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const buttonHover = {
    filter: "brightness(1.2)",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/topics" style={linkStyle}>Topics</Link>

      {user ? (
        <>
          <span style={{ fontSize: "18px", fontWeight: 500 }}>Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, { filter: "brightness(1)" })}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/signup" style={linkStyle}>Signup</Link>
        </>
      )}
    </nav>
  );
}
