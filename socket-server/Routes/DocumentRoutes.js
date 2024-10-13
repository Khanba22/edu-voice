const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const ChannelSchema = require("../Models/ChannelSchema");

const upload = multer({ dest: "uploads/" });

router.post("/add-document", upload.single("uploadedFile"), async (req, res) => {
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

    // Clean up the temporary uploaded file
    fs.unlinkSync(filePath);

    // Handle successful response from the LLM server
    if (llmResponse.status === 200) {
      console.log(llmResponse.data);
      const data = llmResponse.data
      console.log(typeof data);
      console.log(data["main_topic"] , data["subtopics"]);
      if (!data["main_topic"] && !data["subtopics"]) {
        console.log("Topics Not found")
        return;
      }
      const topicObj = []
      for (let index = 0; index < data["subtopics"].length; index++) {
        const element = data["subtopics"][index];
        topicObj.push({
          topicName: element,
          isTranscript: false,
        });
      }
      const document = {
        uploadedBy, // Assuming uploadedBy is an ObjectId
        title: data["main_topic"],
        topics: topicObj, // Make sure these are ObjectIds or handle the conversion
        filePath: uploadedFile.path // Store the path to the uploaded file
      };

      // Add the document to the specified channel
      const updatedChannel = await ChannelSchema.findByIdAndUpdate(
        channelId,
        {
          $push: { documents: document }
        },
        { new: true, useFindAndModify: false } // Return the updated document
      );
      // Return the updated channel data
      console.log(updatedChannel);
      return res.status(200).json(updatedChannel);
    }
    
    return res.status(llmResponse.status).json(llmResponse.data);
  } catch (error) {
    console.error("Error forwarding to LLM server:", error);

    // Ensure file cleanup in case of an error
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return res.status(500).json({ message: "Error uploading document." });
  }
});

module.exports = router;
