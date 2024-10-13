import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ChannelContext } from "../Contexts/ChannelContext";
import TopicMapper from "./TopicMapper";

const ChannelDetails = () => {
  const { userDetails } = useContext(UserContext);
  const { selectedChannel } = useContext(ChannelContext);

  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedChannel || !selectedFile) {
      alert("Please select a channel and file.");
      return;
    }

    const formData = new FormData();
    formData.append("channelId", selectedChannel._id);
    formData.append("uploadedFile", selectedFile);
    formData.append("uploadedBy", userDetails._id);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/document/add-document`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const channelData = await response.json();
        console.log("Document uploaded successfully:", channelData);
        e.target.value = null; // Reset the input field
      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="h-full w-2/12 bg-blue-700">
      {selectedChannel && (
        <>
          <h1>{selectedChannel.channelName}</h1>
          <div className="w-full h-12 bg-red-50">
            <div className="h-full w-full flex items-center justify-center rounded-lg relative cursor-pointer hover:border-gray-400">
              <input
                onChange={handleFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="input-files"
                id="file"
              />
              <label htmlFor="file" className="text-lg text-gray-500">
                Upload your material here
              </label>
            </div>
          </div>
          <TopicMapper documents={selectedChannel.documents}/>
        </>
      )}
    </div>
  );
};

export default ChannelDetails;
