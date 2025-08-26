const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const TOKEN_NAME = "token";
const TOKEN_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

function signAndSetCookie(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie(TOKEN_NAME, token, {
    httpOnly: true,
    secure: false,                 // set true in production behind HTTPS
    sameSite: "lax",
    maxAge: TOKEN_AGE,
    path: "/",
  });
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    signAndSetCookie(res, { id: user._id, email: user.email });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    signAndSetCookie(res, { id: user._id, email: user.email });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(TOKEN_NAME, { path: "/" });
  res.json({ message: "Logged out" });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.[TOKEN_NAME];
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("_id name email");
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    res.json({ user });
  } catch {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
