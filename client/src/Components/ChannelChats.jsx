import React from "react";

const ChannelChats = ({ selectedChannel }) => {
  return (
    <>
      <div className="h-full w-2/12 bg-blue-700">
        {selectedChannel && (
          <>
            <h1>{selectedChannel.channelName}</h1>
            <div className="w-full h-12 bg-red-50">
              <div className="h-full w-full flex items-center justify-center rounded-lg relative cursor-pointer hover:border-gray-400">
                <input
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
          </>
        )}
      </div>
    </>
  );
};

export default ChannelChats;
