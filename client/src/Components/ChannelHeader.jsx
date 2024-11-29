import React, { useContext, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserContext";

const ChannelHeader = () => {
  const {joinAudio, leaveAudio, joinedAudio } =
    useContext(SocketContext);
  const {userDetails} = useContext(UserContext)
  

  return (
    <div className="h-12 w-full bg-neutral-900 border-neutral-700 border-y-2 text-white flex items-center justify-between px-10 z-20 absolute top-16">
      <h1 className="font-semibold text-md">Welcome {userDetails?.username}</h1>
      {!joinedAudio ? (
        <button onClick={joinAudio}>Join Audio</button>
      ) : (
        <button onClick={leaveAudio}>Leave Audio</button>
      )}
    </div>
  );
};

export default ChannelHeader;
