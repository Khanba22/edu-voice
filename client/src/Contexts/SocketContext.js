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
  const {
    channels,
    setSelectedChannel,
    selectedChannel,
    setChannels,
    addPeer,
    removePeer
  } = useContext(ChannelContext);
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
      ws.emit("join-audio", {
        channelId: selectedChannel._id,
        username: userDetails.username,
        peerId: myPeerId.current,
      });
    } catch (err) {
      console.log("", err);
    }
  };

  useEffect(() => {
    ws.on("user-joined", ({ peerId, username }) => {
      handleUserJoin({ peerId, username });
    });
    return () => {
      ws.off("user-joined", handleUserJoin);
    };
  }, [ws]);

  const handleUserJoin = ({ peerId, username }) => {
    if (!myPeer.current) {
      alert("Peer Not Available");
      return;
    }
    alert("Hello");
    console.log("Handle User Called");
    console.log(peerId, username);
    const call = myPeer.current.call(peerId, myStream.current, {
      metadata: {
        username: userDetails.username,
      },
    });
    call.on("stream", (peerStream) => {
      console.log("Call from", peerStream);
      addPeer({ peerId, peerStream, username })
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
    myPeer.current.on("call", (call) => {
      const peerId = call.peer
      const username = call.metadata.username;
      call.answer(myStream.current);
      call.on("stream", (peerStream) => {
        addPeer({ peerId, peerStream, username })
      });
    });
    return () => {
      ws.off("receive-message", receiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPeer.current]);

  return (
    <SocketContext.Provider
      value={{
        ws,
        joinAudio,
        leaveAudio,
        myPeer,
        joinedAudio,
        handleUserJoin,
        receiveMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
