import { createContext, useRef, useState } from "react";

export const ChannelContext = createContext(null);

export const ChannelContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const [peers, setPeers] = useState({});

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

  return (
    <ChannelContext.Provider
      value={{
        addPeer,
        removePeer,
        peers,
        setPeers,
        channels,
        setChannels,
        selectedChannel,
        setSelectedChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
