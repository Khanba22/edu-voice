import React, { useContext, useState } from "react";
import CrossButton from "./CrossButton";
import { UserContext } from "../Contexts/UserContext";
import { ChannelContext } from "../Contexts/ChannelContext";

const AddChannelPopup = ({ show, setShowPopUp }) => {
  const { userDetails } = useContext(UserContext);
  const [channelName, setChannelName] = useState("");
  const { getChannels } = useContext(ChannelContext);

  const createChannel = async () => {
    const userId = userDetails._id;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/channel/create-channel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, channelName }),
      }
    );
    if (res.ok) {
      setShowPopUp(false);
      getChannels();
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-neutral-800 text-white border-2 border-white w-1/2 max-w-lg rounded-lg p-8">
        {/* Close Button */}
        <CrossButton setShowPopUp={setShowPopUp} />
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Channel
        </h2>
        
        {/* Input Field */}
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold" htmlFor="channelName">
            Channel Name
          </label>
          <input
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            type="text"
            placeholder="Enter Channel Name"
            className="p-3 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => setShowPopUp(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={createChannel}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChannelPopup;
