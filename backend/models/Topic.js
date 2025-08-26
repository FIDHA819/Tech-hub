// models/Topic.js
const mongoose = require("mongoose");

const SubTopicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, default: "" },
    docs: { type: String, default: "" },
  },
  { timestamps: true }
);

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    subTopics: { type: [SubTopicSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
