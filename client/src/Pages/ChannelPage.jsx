import React from "react";
import ChannelList from "../Components/ChannelList";
import MainScreen from "../Components/MainScreen";
import ChannelHeader from "../Components/ChannelHeader";
import ChannelChats from "../Components/ChannelChats";
import ChannelSideBar from "../Components/ChannelSideBar";

const ChannelPage = () => {
  return (
    <div className="bg-yellow-300 pt-16 h-full overflow-x-hidden">
      <ChannelHeader />
      <div className="flex h-full relative w-full pt-12">
        {/* Channel List */}
        <ChannelList />
        {/* Main Screen */}
        <ChannelChats/>
        <MainScreen />
        <ChannelSideBar/>
        {/* Voice Controls */}
      </div>
    </div>
  );
};

export default ChannelPage;
