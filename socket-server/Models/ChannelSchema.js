const mongoose = require("mongoose");

// Channel Schema
const ChannelSchema = mongoose.Schema({
  channelName: { type: String, required: true, minlength: 3 },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  chats: [
    {
      text: { type: String, required: true },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  documents: [
    {
      title: { type: String, required: true },
      uploadedFile: { type: String, required: true },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      uploadDate: { type: Date, default: Date.now },
      description: { type: String },
      fileType: { type: String, required: true, match: /\.(pdf|doc|docx|ppt|pptx)$/ }, // Example validation
      topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    },
  ],
  createDate: { type: Date, default: Date.now },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Channel", ChannelSchema)