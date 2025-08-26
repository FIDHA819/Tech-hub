import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopicsPage() {
  const navigate = useNavigate();

  const topics = [
    "JavaScript", "Node.js", "MongoDB", "React",
    "Stack", "Queue", "LinkedList", "Recursion",
    "HashTable", "Sort", "Heap", "BST", "Graph", "Trie",
  ];

  const go = (t) => navigate(`/topics/${t.toLowerCase()}`);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          margin: "24px 0",
          fontSize: "2.8rem",
          fontWeight: "800",
          background: "linear-gradient(90deg, #4f46e5, #14b8a6, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Choose a Topic
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => go(t)}
            style={{
              background: "rgba(17,25,40,0.7)",
              color: "#fff",
              border: "none",
              padding: "18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(20,184,166,0.85)";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(20,184,166,0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(17,25,40,0.7)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
