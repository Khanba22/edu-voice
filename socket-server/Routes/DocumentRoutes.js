const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const ChannelSchema = require("../Models/ChannelSchema");
const Topic = require("../Models/TopicSchema");

const upload = multer({ dest: "uploads/" });

const generateTranscripts = async (topics) => {
  while (true) {
    const llmResponse = await axios.post("http://localhost:5000/generate", {
      topics: topics,
    });
    if (llmResponse.status === 200) {
      return llmResponse.data;
    }
  }
};

const createTopics = async (data) => {
  const noteIds = []; // Array to store created note IDs
  console.log("Creating Topics")
  console.log(data);
  for (let index = 0; index < data.length; index++) {
    const element = data[index]; // Access each element in the data array
    // Create a new topic object from the element
    const newTopic = new Topic({
      topicName: element.metaData.topicName,
      transcript: element.metaData.transcript,
      notes: element.metaData.notes, // Assuming notes are already an array of strings
      tables: element.metaData.tables, // Assuming tables is already in the required format
      graphs: element.metaData.graphs, // Assuming graphs is already in the required format
    });

    try {
      // Save the topic to the database
      const savedTopic = await newTopic.save();
      // Store the created note ID
      noteIds.push({ id: savedTopic._id, topicName: savedTopic.topicName });
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  }

  return noteIds; // Return the array of created note IDs
};

router.post(
  "/add-document",
  upload.single("uploadedFile"),
  async (req, res) => {
    const { channelId, uploadedBy } = req.body;
    const uploadedFile = req.file;

    // Move filePath declaration outside of try block
    const filePath = uploadedFile ? path.resolve(uploadedFile.path) : null;

    if (!channelId || !uploadedBy || !uploadedFile) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    try {
      // Prepare form data for the LLM server
      const formData = new FormData();
      formData.append("channelId", channelId);
      formData.append("uploadedBy", uploadedBy);
      formData.append("file", fs.createReadStream(filePath));

      // Forward the request to the LLM server
      const llmResponse = await axios.post(
        `${process.env.LLM_SERVER_URL}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      console.log(llmResponse.data);
      // Clean up the temporary uploaded file
      fs.unlinkSync(filePath);

      // Handle successful response from the LLM server
      if (llmResponse.status === 200) {
        const data = llmResponse.data;
        if (!data["main_topic"] && !data["subtopics"]) {
          console.log("Topics Not found");
          return;
        }
        const topicObj = [];
        const generatedTranscripts = await generateTranscripts(
          data["subtopics"]
        );
        const newTopics = await createTopics(generatedTranscripts);
        for (let i = 0; i < newTopics.length; i++) {
          const element = newTopics[i];
          topicObj.push({
            topicName: element.topicName,
            isTranscript: true,
            topicId: element.id,
          });
        }

        const newDocument = {
          title: data["main_topic"],
          uploadedBy,
          filePath: uploadedFile.path,
          topics: topicObj,
        };

        // Add the document to the specified channel
        const updatedChannel = await ChannelSchema.findByIdAndUpdate(
          channelId,
          {
            $push: { documents: newDocument },
          },
          { new: true, useFindAndModify: false } // Return the updated document
        );
        // Return the updated channel data
        console.log(updatedChannel);

        return res.status(200).json(updatedChannel);
      }
      console.log("Error forwarding to LLM server:", llmResponse.data);
      return res.status(llmResponse.status).json(llmResponse.data);
    } catch (error) {
      console.error("Error forwarding to LLM server:", error);

      // Ensure file cleanup in case of an error
      if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);

      return res.status(500).json({ message: "Error uploading document." });
    }
  }
);

router.post("/get-topic", async (req, res) => {
  const { topicId } = req.body;
  const topicData = await Topic.findById(topicId);
  res.status(200).json(topicData);
});

module.exports = router;
