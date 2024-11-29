import React, { useState } from "react";

const ChannelList = ({
  channels,
  selectChannel,
  setSelectedPopUpWindow,
  setShowPopUp,
}) => {
  const [expand, setExpand] = useState(true);
  const [selectedIndex, setSelected] = useState(0);

  return (
    <div
      className="w-12 h-full border-neutral-700 z-30"
    >
      <div
        className={`relative transition w-80 h-full ${expand ? "" : "w-80"}`}
        style={expand ? { transform: "translateX(-17rem)" } : {}}
      >
        <div className="overflow-y-scroll h-full bg-zinc-900 py-2  w-full channelList">
          <AddChannelComponent
            setShowPopUp={setShowPopUp}
            setSelectedPopUpWindow={setSelectedPopUpWindow}
            expand={expand}
          />
          {channels.map((channel, index) => (
            <div
              key={index}
              onClick={() => {
                selectChannel(index);
                setSelected(index);
              }}
              className={`${
                selectedIndex === index ? "bg-zinc-800" : "bg-zinc-900"
              } h-16 w-full px-1 flex justify-end items-center`}
            >
              <div
                className={`${
                  selectedIndex === index ? "bg-slate-200" : "bg-slate-200"
                } flex aspect-square justify-center items-center h-10 rounded-full`}
              >
                {channel.channelName[0]}
              </div>
              <div
                className={`${expand && "hidden"} h-full mx-3 w-full ${
                  selectedIndex === index ? "bg-zinc-800" : "bg-zinc-900"
                } text-white p-1`}
              >
                <div className="flex w-full justify-between">
                  <p className="text-m p-0 m-0">{channel.channelName}</p>
                  <span>12-12AM</span>
                </div>
                <p className=" text-s ">Hello</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setExpand(!expand);
          }}
          className="absolute -right-4 top-0 bottom-0 w-4 h-10 m-auto bg-slate-900 text-white rounded-r-lg"
        >
          B
        </button>
      </div>
    </div>
  );
};

export default ChannelList;

const AddChannelComponent = ({
  expand,
  setSelectedPopUpWindow,
  setShowPopUp,
}) => {
  return (
    <div
      onClick={() => {
        setShowPopUp(true);
        setSelectedPopUpWindow("addChannel");
      }}
      className={`bg-zinc-900 h-16 w-full px-1 flex justify-end items-center`}
    >
      <div
        className={`${"bg-slate-200"} flex aspect-square justify-center items-center h-10 rounded-full`}
      >
        +{/* Logo */}
      </div>
      <div
        className={`${
          expand && "hidden"
        } h-full mx-3 w-full ${"bg-zinc-900"} text-white p-1`}
      >
        <div className="flex w-full justify-between">
          <p className="text-m p-0 m-0">{"Add Channel"}</p>
        </div>
      </div>
    </div>
  );
};
