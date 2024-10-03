import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../Contexts/SocketContext";
import { ChannelContext } from "../Contexts/ChannelContext";

const ChannelSideBar = () => {
  const [extend, setExtend] = useState(false);
  const { peers } = useContext(ChannelContext);
  const peerArray = Object.keys(peers);
  return (
    <div className="h-full relative w-1/12 bg-slate-800">
      <div className="h-5/6 bg-purple-700">
        {peerArray.map((peer) => (
          <>
            <div key={peer}>{peer}</div>
          </>
        ))}
      </div>
      <div
        className={`transition w-96 h-5/6 absolute top-0 left-full ${
          extend && "-translate-x-full"
        } bg-green-500`}
      >
        Settings
      </div>
      <button
        onClick={() => {
          setExtend(!extend);
        }}
        className="absolute bottom-12 right-12 bg-pink-400 h-14 w-14 rounded-full "
      >
        P
      </button>
    </div>
  );
};

export default ChannelSideBar;
