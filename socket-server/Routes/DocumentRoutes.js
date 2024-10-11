const express = require("express");
const router = express.Router();
const Channel = require("../Models/ChannelSchema");
const Topic = require("../Models/TopicSchema"); // Assuming the Document model is in the Models folder

// Route to get documents for a specific channel
router.post("/get-documents", async (req, res) => {
  try {
    const { channelId } = req.body;
    const channel = await Channel.findById(channelId).populate("documents");
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.json(channel.documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a document to a channel
router.post("/add-document", async (req, res) => {
  try {
    const { channelId, title, uploadedFile, uploadedBy, description, fileType } = req.body;
    const document = { title, uploadedFile, uploadedBy, description, fileType };
    const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $push: { documents: document } },
      { new: true }
    );
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get topics from a document
router.post("/get-topics", async (req, res) => {
  try {
    const { documentId } = req.body;
    const document = await Channel.findOne({ "documents._id": documentId })
      .select({ "documents.$": 1 })
      .populate("documents.topics");
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document.documents[0].topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a topic to a document
router.post("/add-topic", async (req, res) => {
  try {
    const { documentId, topicName, transcript, notes, tables, graphs } = req.body;
    const newTopic = new Topic({ topicName, transcript, notes, tables, graphs });
    await newTopic.save();
    
    const channel = await Channel.findOneAndUpdate(
      { "documents._id": documentId },
      { $push: { "documents.$.topics": newTopic._id } },
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to remove a topic from a document
router.post("/remove-topic", async (req, res) => {
  try {
    const { documentId, topicId } = req.body;

    const channel = await Channel.findOneAndUpdate(
      { "documents._id": documentId },
      { $pull: { "documents.$.topics": topicId } },
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({ message: "Document or topic not found" });
    }

    await Topic.findByIdAndDelete(topicId); // Optionally delete the topic itself
    res.status(200).json({ message: "Topic removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
