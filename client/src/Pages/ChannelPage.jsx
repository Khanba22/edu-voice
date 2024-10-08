import React, { useContext, useEffect } from "react";
import ChannelList from "../Components/ChannelList";
import MainScreen from "../Components/MainScreen";
import ChannelHeader from "../Components/ChannelHeader";
import ChannelChats from "../Components/ChannelChats";
import ChannelSideBar from "../Components/ChannelSideBar";
import { SocketContext, SocketProvider } from "../Contexts/SocketContext";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { ChannelContext } from "../Contexts/ChannelContext";

const ChannelPage = () => {
  const { userDetails } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { channels, setSelectedChannel, selectedChannel, setChannels } =
    useContext(ChannelContext);
  const { ws, handleUserJoin, receiveMessage } = useContext(SocketContext);

  const selectChannel = (index) => {
    setSelectedChannel(channels[index]);
  };

  const getChannels = async () => {
    if (!userDetails) {
      return;
    }
    await fetch("http://localhost:4000/user/get-channels", {
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
      });
  };

  useEffect(() => {
    getChannels();
  }, [isAuthenticated]);
  return (
    <SocketProvider>
      <div className="bg-yellow-300 pt-16 h-full overflow-x-hidden">
        <ChannelHeader />
        <div className="flex h-full relative w-full pt-12">
          <ChannelList channels={channels} selectChannel={selectChannel} />
          <ChannelChats selectedChannel={selectedChannel} />
          <MainScreen selectedChannel={selectedChannel} />
          <ChannelSideBar selectedChannel={selectedChannel} />
        </div>
      </div>
    </SocketProvider>
  );
};

export default ChannelPage;
