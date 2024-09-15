import { createContext, useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import Peer from "peerjs";
import { useDispatch } from "react-redux";
import {v4 as uuidv4} from "uuid"



export const SocketContext = createContext(null);
const socketUrl = process.env.SocketUrl || "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const ws = socketIo(socketUrl);
  const peers = useRef([]);
  const [stream, setStream] = useState(null);
  const [chats, setChats] = useState([]);
  const [myPeerId,setMyPeerId] = useState("");
  const [me, setMe] = useState(null);
  const receiveMessage = (message) => {
    if (message) {
      setChats([...chats, message]);
    }
  };
  const adminRef = useRef(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    ws.on("receive-message", receiveMessage);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes("/room")) {
      const meId = uuidv4();
      setMyPeerId(meId);
      const peer = new Peer(meId);
      setMe(peer);
      if (!peer) {
        alert("Peer Connection Failed");
        return;
      }
      try {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          setStream(stream);
          // dispatched(addPeerAction(meId, stream));
        });
      } catch (error) {
        console.error(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId, username }) => {
      const call = me.call(peerId, stream, {
        metadata: {
          username: usernameRef.current,
        },
      });
      call.on("stream", (peerStream) => {
        // dispatched(addPeerAction(peerId, peerStream, username));
      });
    });

    me.on("call", (call) => {
      const caller = call.metadata.username;
      call.answer(stream, { metadata: { username:usernameRef.current } });
      call.on("stream", (peerStream) => {
        // dispatched(addPeerAction(call.peer, peerStream, caller));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, stream]);

  return (
    <SocketContext.Provider value={{ ws, peers, chats }}>
      {children}
    </SocketContext.Provider>
  );
};
