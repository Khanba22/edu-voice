import React, { useContext, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";

const ChannelHeader = () => {
  const {  ws, joinAudio,leaveAudio, myPeer,joinedAudio  } = useContext(SocketContext);

  return (
    <div className="h-12 w-full bg-pink-600 z-20 absolute top-16">
      {
        !joinedAudio?<button onClick={joinAudio}>Join Audio</button>:<button onClick={leaveAudio}>Leave Audio</button>
      }
    </div>
  );
};

export default ChannelHeader;
