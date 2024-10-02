import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const ChannelList = ({ channels, selectChannel }) => {
  const [expand, setExpand] = useState(true);
  const [selectedIndex, setSelected] = useState(0);

  return (
    <div className="w-12 h-full z-50">
      <div
        className={`relative transition w-80 h-full ${expand ? "" : "w-80"}`}
        style={expand ? { transform: "translateX(-17rem)" } : {}}
      >
        <div className="overflow-y-scroll h-full bg-neutral-800 py-2  w-full channelList">
          {channels.map((channel, index) => (
            <div
              key={channel}
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
                {/* Logo */}
              </div>
              <div
                className={`${
                  expand && "hidden"
                } h-full mx-3 w-full ${selectedIndex === index ? "bg-zinc-800" : "bg-zinc-900"} text-white p-1`}
              >
                <div className="flex w-full justify-between">
                  <p className="text-m p-0 m-0">{channel.channelName}</p>
                  <span>12-12AM</span>
                </div>
                <p className=" text-s ">Last Chat said blah blah blah</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setExpand(!expand);
          }}
          className="absolute -right-4 top-0 bottom-0 w-4 h-10 m-auto bg-blue-800"
        >
          B
        </button>
      </div>
    </div>
  );
};

export default ChannelList;
