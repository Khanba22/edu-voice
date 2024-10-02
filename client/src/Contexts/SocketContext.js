import { createContext, useEffect, useMemo, useRef, useState } from "react";
import socketIo from "socket.io-client";
import Peer from "peerjs";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPeers, removePeer } from "../Redux/PeerSlice";

export const SocketContext = createContext(null);
const socketUrl = process.env.SocketUrl || "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const ws = socketIo(socketUrl);
  const myPeer = useRef(null);
  const myPeerId = useRef(null);
  const myStream = useRef(null);

  const receiveMessage = ({ sender, message, timeStamp }) => {};

  useMemo(() => {
    const peerId = uuidv4();
    myPeerId.current = peerId;
    const peer = new Peer(peerId);
    myPeer.current = peer;
    console.log(myPeer.current);
  }, []);

  const joinAudio = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((media) => {
          myStream.current = media;
        });
    } catch (err) {
      console.log("", err);
    }
  };

  useEffect(() => {
    ws.on("receive-message", receiveMessage);
    myPeer.current.on("call", (call) => {
      const caller = call.metadata.username;
      call.answer(myStream.current);
      call.on("stream", (peerStream) => {
        dispatch({
          type: `${addPeers}`,
          payload: {
            peerId: call.peer,
            peerStream,
          },
        });
      });
    });
    return () => {
      ws.off("receive-message", receiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPeer.current]);

  return (
    <SocketContext.Provider value={{ ws , joinAudio , myPeer }}>{children}</SocketContext.Provider>
  );
};
