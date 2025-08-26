// routes/topics.js
const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// List all topics (optional, handy for debugging)
router.get("/", async (_req, res) => {
  try {
    const topics = await Topic.find().select("name");
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get topic by name (auto-create if missing)
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    let topic = await Topic.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (!topic) {
      topic = await Topic.create({ name, subTopics: [] });
    }
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add subtopic by topic name (auto-create topic if missing)
router.post("/:name/subtopics", async (req, res) => {
  try {
    const name = req.params.name;
    const { title, code = "", docs = "" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }

    let topic = await Topic.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (!topic) topic = new Topic({ name, subTopics: [] });

    topic.subTopics.push({ title: title.trim(), code, docs });
    await topic.save();

    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update subtopic (by id)
router.put("/:name/subtopics/:subId", async (req, res) => {
  try {
    const topic = await Topic.findOne({
      name: new RegExp(`^${req.params.name}$`, "i"),
    });
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const sub = topic.subTopics.id(req.params.subId);
    if (!sub) return res.status(404).json({ error: "SubTopic not found" });

    if (typeof req.body.code === "string") sub.code = req.body.code;
    if (typeof req.body.docs === "string") sub.docs = req.body.docs;
    if (typeof req.body.title === "string" && req.body.title.trim())
      sub.title = req.body.title.trim();

    await topic.save();
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete subtopic (by id)
router.delete("/:name/subtopics/:subId", async (req, res) => {
  try {
    const topic = await Topic.findOne({
      name: new RegExp(`^${req.params.name}$`, "i"),
    });
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    const sub = topic.subTopics.id(req.params.subId);
    if (!sub) return res.status(404).json({ error: "SubTopic not found" });

    sub.deleteOne();
    await topic.save();

    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
