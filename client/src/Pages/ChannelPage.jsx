import React, { useContext, useEffect, useState } from "react";
import ChannelList from "../Components/ChannelList";
import MainScreen from "../Components/MainScreen";
import ChannelHeader from "../Components/ChannelHeader";
import ChannelChats from "../Components/ChannelChats";
import ChannelSideBar from "../Components/ChannelSideBar";
import { SocketContext, SocketProvider } from "../Contexts/SocketContext";
import { AuthContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";
import { ChannelContext } from "../Contexts/ChannelContext";
import AddChannelPopup from "../Components/AddChannelPopup";

const ChannelPage = () => {
  const { userDetails } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { channels, setSelectedChannel, selectedChannel, setChannels } =
    useContext(ChannelContext);
  const { ws, handleUserJoin, receiveMessage } = useContext(SocketContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPopUpWindow, setSelectedPopUpWindow] = useState("addChannel");
  const popUpWindows = {
    addChannel: <AddChannelPopup setShowPopUp={setShowPopUp} />,
  };

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
      <div className="bg-yellow-300 pt-16 h-full overflow-x-hidden relative">
        <ChannelHeader />
        <div
          className={`absolute ${
            !showPopUp && "hidden"
          } h-screen w-screen z-50 left-0 right-0 bottom-0 top-0 m-auto`}
        >
          {popUpWindows[selectedPopUpWindow]}
        </div>
        <div className="flex h-full relative w-full pt-12">
          <ChannelList
            setShowPopUp={setShowPopUp}
            setSelectedPopUpWindow={setSelectedPopUpWindow}
            channels={channels}
            selectChannel={selectChannel}
          />
          <ChannelChats selectedChannel={selectedChannel} />
          <MainScreen selectedChannel={selectedChannel} />
          <ChannelSideBar selectedChannel={selectedChannel} />
        </div>
      </div>
    </SocketProvider>
  );
};

export default ChannelPage;
