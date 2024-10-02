import { createContext, useRef, useState } from "react";

export const ChannelContext = createContext(null);

export const ChannelContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <ChannelContext.Provider
      value={{
        channels,
        setChannels,
        selectedChannel,
        setSelectedChannel
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
