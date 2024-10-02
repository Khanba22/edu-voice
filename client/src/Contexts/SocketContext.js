import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import socketIo from "socket.io-client";
import Peer from "peerjs";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPeers, clearPeers, removePeer } from "../Redux/PeerSlice";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ChannelContext } from "./ChannelContext";

export const SocketContext = createContext(null);
const socketUrl = process.env.SocketUrl || "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const ws = socketIo(socketUrl);
  const myPeer = useRef(null);
  const myPeerId = useRef(null);
  const myStream = useRef(null);
  const [joinedAudio, setJoinedAudio] = useState(false);

  const receiveMessage = ({ sender, message, timeStamp }) => {};
  const { channels, setSelectedChannel, selectedChannel, setChannels } =
    useContext(ChannelContext);
  const { userDetails } = useContext(UserContext);

  useMemo(() => {
    const peerId = uuidv4();
    myPeerId.current = peerId;
    const peer = new Peer(peerId);
    myPeer.current = peer;
  }, []);

  const joinAudio = async () => {
    setJoinedAudio(true);
    try {
      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((media) => {
          myStream.current = media;
        });
      // Add Joining Logic
      ws.emit("join-audio", {
        channelId: selectedChannel._id,
        username: userDetails.username,
        peerId: myPeerId.current,
      });
    } catch (err) {
      console.log("", err);
    }
  };

  const handleUserJoin = ({ peerId , username }) => {
    console.log(peerId, username);
    const call = myPeer.current.call(peerId, myStream, {
      metadata: {
        username: userDetails.username,
      },
    });
    call.on("stream", (peerStream) => {
      dispatch({
        type: `${addPeers}`,
        payload: {
          username:username,
          peerId: peerId,
          stream: peerStream,
        },
      });
    });
  };

  const leaveAudio = () => {
    setJoinedAudio(false);
    if (myStream.current) {
      myStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    dispatch({
      type: `${clearPeers}`,
    });
  };

  useEffect(() => {
    ws.on("receive-message", receiveMessage);
    ws.on("user-joined", handleUserJoin);
    myPeer.current.on("call", (call) => {
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
      ws.off("user-joined", handleUserJoin);
      leaveAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPeer.current]);

  return (
    <SocketContext.Provider
      value={{ ws, joinAudio, leaveAudio, myPeer, joinedAudio }}
    >
      {children}
    </SocketContext.Provider>
  );
};
