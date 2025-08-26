import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(14px)",
          backgroundColor: "rgba(17, 25, 40, 0.8)",
          padding: "3rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          textAlign: "center",
          maxWidth: "650px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(90deg, #4f46e5, #14b8a6, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1.5rem",
          }}
        >
          Welcome to Tech-Hub 🚀
        </h1>

        <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#e5e7eb" }}>
          Explore the world of{" "}
          <span style={{ fontWeight: "600", color: "#14b8a6" }}>MERN + Algorithms</span>{" "}
          with interactive{" "}
          <span style={{ fontStyle: "italic", color: "#f472b6" }}>challenges</span>,{" "}
          <span style={{ color: "#a78bfa" }}>notes</span>, and{" "}
          <span style={{ fontWeight: "700", color: "#4f46e5" }}>code examples</span>.{" "}
          Level up your{" "}
          <span style={{ fontWeight: "600", color: "#facc15" }}>problem-solving</span>{" "}
          skills while building real-world projects.
        </p>

        <button
          style={{
            marginTop: "2rem",
            background: "linear-gradient(90deg, #14b8a6, #4f46e5)",
            color: "white",
            fontWeight: "600",
            padding: "0.85rem 1.75rem",
            fontSize: "1rem",
            borderRadius: "0.75rem",
            boxShadow: "0 6px 15px rgba(79, 70, 229, 0.5)",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(79,70,229,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(79,70,229,0.5)";
          }}
          onClick={() => navigate("/topics")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
