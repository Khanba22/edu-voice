import React, { useContext, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserContext";

const ChannelHeader = () => {
  const {joinAudio, leaveAudio, joinedAudio } =
    useContext(SocketContext);
  const {userDetails} = useContext(UserContext)
  

  return (
    <div className="h-12 w-full bg-pink-600 z-20 absolute top-16">
      <h1>{userDetails?.username}</h1>
      {!joinedAudio ? (
        <button onClick={joinAudio}>Join Audio</button>
      ) : (
        <button onClick={leaveAudio}>Leave Audio</button>
      )}
    </div>
  );
};

export default ChannelHeader;
