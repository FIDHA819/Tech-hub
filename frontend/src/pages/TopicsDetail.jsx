import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function TopicsDetail() {
  const { topicId } = useParams();
  const safeTopicId = encodeURIComponent(topicId); // ✅ encode once

  const [loading, setLoading] = useState(true);
  const [subTopics, setSubTopics] = useState([]);
  const [newSubTopic, setNewSubTopic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    axios
      .get(`${API}/topics/${safeTopicId}`) // ✅ safe id
      .then((res) => {
        if (!ignore) {
          const withCompleted = (res.data.subTopics || []).map((st) => ({
            ...st,
            completed: st.completed || false,
          }));
          setSubTopics(withCompleted);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setError(err?.response?.data?.error || "Failed to load");
      })
      .finally(() => !ignore && setLoading(false));

    return () => (ignore = true);
  }, [safeTopicId]);

  const addSubTopic = async () => {
    const title = newSubTopic.trim();
    if (!title) return;

    try {
      const { data } = await axios.post(
        `${API}/topics/${safeTopicId}/subtopics`, // ✅ safe id
        { title }
      );
      const withCompleted = (data.subTopics || []).map((st) => ({
        ...st,
        completed: st.completed || false,
      }));
      setSubTopics(withCompleted);
      setNewSubTopic("");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to add subtopic");
    }
  };

  const updateSubTopic = async (id, field, value) => {
    const updated = subTopics.map((s) =>
      s._id === id ? { ...s, [field]: value } : s
    );
    setSubTopics(updated);

    try {
      const target = updated.find((s) => s._id === id);
      await axios.put(`${API}/topics/${safeTopicId}/subtopics/${id}`, {
        code: target.code,
        docs: target.docs,
        title: target.title,
        completed: target.completed,
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to update");
    }
  };

  const deleteSubTopic = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API}/topics/${safeTopicId}/subtopics/${id}` // ✅ safe id
      );
      const withCompleted = (data.subTopics || []).map((st) => ({
        ...st,
        completed: st.completed || false,
      }));
      setSubTopics(withCompleted);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to delete");
    }
  };

  const toggleCompleted = (id) => {
    const updated = subTopics.map((s) =>
      s._id === id ? { ...s, completed: !s.completed } : s
    );
    setSubTopics(updated);
    updateSubTopic(id, "completed", !subTopics.find((s) => s._id === id).completed);
  };

  const openCompiler = (code) => {
    const encoded = encodeURIComponent(code || "");
    window.open(`https://onecompiler.com/javascript?code=${encoded}`, "_blank");
  };

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(to right, #111827, #1e293b)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#f0fdf4" }}>
        {topicId.toUpperCase()} 🚀
      </h1>

      {error && (
        <div style={{ maxWidth: 900, margin: "1rem auto", color: "#f87171" }}>
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <input
          value={newSubTopic}
          onChange={(e) => setNewSubTopic(e.target.value)}
          placeholder="Add a sub-topic (e.g. Fibonacci Series)"
          style={{
            minWidth: 260,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #374151",
            background: "#1f2937",
            color: "#f0fdf4",
          }}
        />
        <button
          onClick={addSubTopic}
          style={{
            background: "#4f46e5",
            color: "#fff",
            border: 0,
            padding: "12px 16px",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#3730a3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#4f46e5")
          }
        >
          ➕ Add
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
          gap: 16,
        }}
      >
        {subTopics.map((sub) => (
          <div
            key={sub._id}
            style={{
              background: "#1f2937",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,.5)",
              color: "#f0fdf4",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => toggleCompleted(sub._id)}
                style={{
                  marginRight: 12,
                  width: 18,
                  height: 18,
                  accentColor: "#10b981",
                }}
              />
              <input
                value={sub.title}
                onChange={(e) => updateSubTopic(sub._id, "title", e.target.value)}
                style={{
                  width: "100%",
                  fontSize: 18,
                  fontWeight: 600,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#f0fdf4",
                }}
              />
            </div>

            <textarea
              rows={6}
              value={sub.code || ""}
              onChange={(e) => updateSubTopic(sub._id, "code", e.target.value)}
              placeholder="Write code here…"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #374151",
                fontFamily: "monospace",
                background: "#111827",
                color: "#f0fdf4",
              }}
            />
            <button
              onClick={() => openCompiler(sub.code)}
              style={{
                background: "#10b981",
                color: "#fff",
                border: 0,
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                marginTop: 8,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#059669")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "#10b981")
              }
            >
              ▶ Run in Compiler
            </button>

            <textarea
              rows={3}
              value={sub.docs || ""}
              onChange={(e) => updateSubTopic(sub._id, "docs", e.target.value)}
              placeholder="Add notes, links, docs…"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #374151",
                marginTop: 10,
                background: "#111827",
                color: "#f0fdf4",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => deleteSubTopic(sub._id)}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: 0,
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  marginTop: 10,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#b91c1c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#ef4444")
                }
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link
          to="/topics"
          style={{
            background: "#4f46e5",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 8,
            textDecoration: "none",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#3730a3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#4f46e5")
          }
        >
          🔙 Back to Topics
        </Link>
      </div>
    </div>
  );
}
