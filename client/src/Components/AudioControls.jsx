import React, { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../Contexts/SocketContext";

const AudioControls = ({ peer, peerId }) => {
  const { myPeerId, myStream } = useContext(SocketContext);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      if (myPeerId === peerId) {
        ref.current.srcObject = myStream
        console.log(myStream)
      }else{
        ref.current.srcObject = peer.stream;
        console.log(peer.stream)
      }
    }
  }, [peer.stream, ref]);

  return (
    <div key={peerId}>
      <p>{peer.stream.id}</p>
      <video
        ref={ref}
        autoPlay
        // playsInline
        className="w-full aspect-square bg-purple-500"
      ></video>
    </div>
  );
};

export default AudioControls;
