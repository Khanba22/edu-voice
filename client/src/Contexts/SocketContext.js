import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import socketIo from "socket.io-client";
import Peer from "peerjs";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { clearPeers } from "../Redux/PeerSlice";
import { UserContext } from "./UserContext";
import { ChannelContext } from "./ChannelContext";
import {
  addPeerAction,
  clearPeersAction,
  removePeerAction,
} from "./peerActions";
import { peerReducer } from "./peerReducer";

export const SocketContext = createContext(null);
const socketUrl = process.env.SocketUrl || "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const ws = useMemo(() => socketIo(socketUrl), []);
  const [me, setMe] = useState(null);
  const [stream, setStream] = useState(null);
  const myPeerId = useRef(null);
  const [joinedAudio, setJoinedAudio] = useState(false);
  const [peers, dispatched] = useReducer(peerReducer, {});

  const receiveMessage = ({ sender, message, timeStamp }) => {};

  const { channels, selectedChannel } = useContext(ChannelContext);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const peerId = uuidv4();
    myPeerId.current = peerId;
    const peer = new Peer(peerId);
    setMe(peer);

    // Cleanup function to destroy the Peer connection on unmount
    return () => {
      peer.disconnect();
      leaveAudio();
      peer.destroy();
    };
  }, []);

  const joinAudio = async () => {
    setJoinedAudio(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(mediaStream);

      if (me && selectedChannel && userDetails) {
        ws.emit("join-audio", {
          channelId: selectedChannel._id,
          username: userDetails.username,
          peerId: me.id,
        });
      }
    } catch (err) {
      console.log("Error accessing media devices:", err);
    }
  };

  useEffect(() => {
    if (!me || !stream) return;

    const handleUserJoined = ({ peerId, username }) => {
      const call = me.call(peerId, stream, {
        metadata: { username: userDetails.username },
      });

      call.on("stream", (peerStream) => {
        dispatched(addPeerAction(peerId, peerStream, username));
      });
    };

    const handleCall = (call) => {
      const caller = call.metadata.username;
      call.answer(stream, { metadata: { username: userDetails.username } });
      console.log("Got A Call from ", call.peer);
      call.on("stream", (peerStream) => {
        console.log("Got A Stream From ", call.peer);
        dispatched(addPeerAction(call.peer, peerStream, caller));
      });
    };

    ws.on("user-joined", handleUserJoined);
    me.on("call", handleCall);

    // Cleanup listeners on unmount or dependencies change
    return () => {
      ws.off("user-joined", handleUserJoined);
      leaveAudio();
      me.off("call", handleCall);
    };
  }, [me, stream, ws, userDetails, dispatched]);

  const leaveAudio = () => {
    ws.emit("leave-audio", { username: userDetails.username, channelId: selectedChannel._id });
    setJoinedAudio(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    dispatched(clearPeersAction());
  };

  return (
    <SocketContext.Provider
      value={{
        myPeerId: myPeerId.current,
        ws,
        joinAudio,
        leaveAudio,
        me,
        myStream: stream,
        peers,
        joinedAudio,
        receiveMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
