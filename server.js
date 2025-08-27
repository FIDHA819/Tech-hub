require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const topicRoutes = require("./backend/routes/topics");
const cookieParser = require("cookie-parser");




const app = express();



const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://techhub-pink-theta.vercel.app" // your live frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());


app.use(express.json());
app.use(morgan("dev"));
app.use("/api/topics", topicRoutes);
app.use("/api/auth", require("./backend/routes/auth"));

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  // if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../frontend/build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  // });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));