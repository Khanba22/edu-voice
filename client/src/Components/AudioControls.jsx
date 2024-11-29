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
    <div key={peerId} className="relative w-full aspect-square">
      <p className="absolute left-0 bottom-0 m-auto">{peer.username}</p>
      <video
        ref={ref}
        autoPlay
        muted={myPeerId === peerId}
        className="w-full h-full bg-neutral-900"
      ></video>
      <button className="absolute text-white left-0 right-0 top-0 bottom-0 m-auto">
        Mute
      </button>
    </div>
  );
};

export default AudioControls;
