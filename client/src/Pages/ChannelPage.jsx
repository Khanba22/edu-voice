import React, { useContext, useEffect, useState } from "react";
import ChannelList from "../Components/ChannelList";
import MainScreen from "../Components/MainScreen";
import ChannelHeader from "../Components/ChannelHeader";
import ChannelSideBar from "../Components/ChannelSideBar";
import { SocketProvider } from "../Contexts/SocketContext";
import { AuthContext } from "../Contexts/AuthContext";
import { ChannelContext } from "../Contexts/ChannelContext";
import AddChannelPopup from "../Components/AddChannelPopup";
import ChannelDetails from "../Components/ChannelDetails";

const ChannelPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { channels, setSelectedChannel, selectedChannel, getChannels } =
    useContext(ChannelContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPopUpWindow, setSelectedPopUpWindow] = useState("addChannel");
  const popUpWindows = {
    addChannel: <AddChannelPopup setShowPopUp={setShowPopUp} />,
  };

  const selectChannel = (index) => {
    setSelectedChannel(channels[index]);
  };



  useEffect(() => {
    getChannels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ChannelDetails selectedChannel={selectedChannel} />
          <MainScreen selectedChannel={selectedChannel} />
          <ChannelSideBar selectedChannel={selectedChannel} />
        </div>
      </div>
    </SocketProvider>
  );
};

export default ChannelPage;
