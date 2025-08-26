function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d1117",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#58a6ff" }}>
        About Me
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "700px", lineHeight: "1.8" }}>
        Hi 👋, I’m <strong>Fidha Fathima</strong>.  
        I’m building my own app to learn and share knowledge in the{" "}
        <strong>MERN stack</strong>.  
        Here, I try different problems, share questions with answers,  
        and make it helpful for others too 🚀.
      </p>

      <div style={{ marginTop: "30px" }}>
        <a
          href="https://www.linkedin.com/in/fidha-fathima-3886301a6/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 15px",
            padding: "10px 20px",
            backgroundColor: "#0077b5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/FIDHA819/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 15px",
            padding: "10px 20px",
            backgroundColor: "#24292f",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
