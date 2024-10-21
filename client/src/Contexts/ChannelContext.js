import { createContext, useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";

export const ChannelContext = createContext(null);

export const ChannelContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const { userDetails } = useContext(UserContext);
  const [peers, setPeers] = useState({});
  const [currentTopic,setCurrentTopic] = useState(null)

  const addPeer = ({ peerId, peerStream, username }) => {
    setPeers({
      ...peers,
      [username]: {
        peerStream,
        peerId,
      },
    });
  };

  const removePeer = ({ username }) => {
    const { [username]: deleted, ...rest } = peers;
    setPeers(rest);
  };

  const getChannels = async () => {
    if (!userDetails) {
      return;
    }
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/get-channels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userDetails._id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setChannels(data.channels);
        if (!selectedChannel) {
          return;
        }
        const selected = data.channels.findIndex(
          (x) => x._id === selectedChannel._id
        );
        setSelectedChannel(data.channels[selected]);
      });
  };

  return (
    <ChannelContext.Provider
      value={{
        currentTopic,
        setCurrentTopic,
        addPeer,
        removePeer,
        peers,
        setPeers,
        channels,
        setChannels,
        getChannels,
        selectedChannel,
        setSelectedChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
