import { createContext, useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import Peer from "peerjs";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const SocketContext = createContext(null);
const socketUrl = process.env.SocketUrl || "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const peers = useRef(null);
  const myPeer = useRef(null);
  const myStream = useRef(null);

  useEffect(() => {
    if (window.location.pathname.includes("/room")) {
      const meId = uuidv4();
      setMyPeerId(meId);
      const peer = new Peer(meId);
      myPeer.current = peer;
      if (!peer) {
        alert("Peer Connection Failed");
        return;
      }
      try {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          myStream.current = stream;
          // dispatched(addPeerAction(meId, stream));
        });
      } catch (error) {
        console.error(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <SocketContext.Provider value={{ ws, peers, chats }}>
      {children}
    </SocketContext.Provider>
  );
};
