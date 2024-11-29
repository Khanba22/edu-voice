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
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "./UserContext";
import { ChannelContext } from "./ChannelContext";
import {
  addPeerAction,
  clearPeersAction,
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

  const receiveMessage = ({ sender, message, timeStamp }) => {
    // Handle incoming messages here (optional)
  };

  const {  selectedChannel } = useContext(ChannelContext);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    if (!userDetails) {
      // alert("User details are not available. Please log in again.");
      return;
    }

    const peerId = uuidv4();
    myPeerId.current = peerId;
    const peer = new Peer(peerId);

    peer.on("open", (id) => {
      console.log("Peer connection established with ID:", id);
    });

    setMe(peer);

    // Cleanup function to destroy the Peer connection on unmount
    return () => {
      peer.disconnect();
      leaveAudio();
      peer.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]); // Only run once when userDetails are available

  const joinAudio = async () => {
    if (!selectedChannel || !userDetails || joinedAudio) {
      alert("Unable to join audio. Please check your connection and try again.");
      return;
    }

    setJoinedAudio(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(mediaStream);

      if (me) {
        ws.emit("join-audio", {
          channelId: selectedChannel._id,
          username: userDetails.username,
          peerId: me.id,
        });
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Error accessing media devices. Please check your camera and microphone permissions.");
      setJoinedAudio(false); // Ensure state is reset
    }
  };

  useEffect(() => {
    if (!me || !stream || !ws) return;

    const handleUserJoined = ({ peerId, username }) => {
      try {
        const call = me.call(peerId, stream, {
          metadata: { username: userDetails.username },
        });

        call.on("stream", (peerStream) => {
          dispatched(addPeerAction(peerId, peerStream, username));
        });
      } catch (error) {
        console.error("Error handling user join:", error);
        alert("Error during user join. Please try again later.");
      }
    };

    const handleCall = (call) => {
      try {
        const caller = call.metadata.username;
        call.answer(stream, { metadata: { username: userDetails.username } });
        console.log("Got A Call from ", call.peer);
        call.on("stream", (peerStream) => {
          console.log("Got A Stream From ", call.peer);
          dispatched(addPeerAction(call.peer, peerStream, caller));
        });
      } catch (error) {
        console.error("Error handling call:", error);
        alert("Error during call handling. Please try again.");
      }
    };

    ws.on("user-joined", handleUserJoined);
    me.on("call", handleCall);

    // Cleanup listeners on unmount or dependencies change
    return () => {
      ws.off("user-joined", handleUserJoined);
      leaveAudio();
      me.off("call", handleCall);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, stream, ws, userDetails, dispatched, selectedChannel]);

  const leaveAudio = () => {
    if (!selectedChannel || !userDetails) {
      // alert("Unable to leave audio. Please try again.");
      return;
    }

    ws.emit("leave-audio", {
      username: userDetails.username,
      channelId: selectedChannel._id,
    });
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
