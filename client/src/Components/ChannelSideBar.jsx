import React, { useContext, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import AudioControls from "./AudioControls";
import MemberList from "./MemberList";

const ChannelSideBar = () => {
  const [extend, setExtend] = useState(false);
  const { peers } = useContext(SocketContext);
  const peerArray = Object.keys(peers);
  return (
    <div className="h-full relative w-1/12 bg-slate-800">
      <div className="h-5/6 bg-neutral-800 border-x-2 border-neutral-700">
        {peerArray.map((peer) => (
          <>
            <AudioControls key={peer} peer={peers[peer]} peerId={peer} />
          </>
        ))}
      </div>
      <div
        className={`transition w-96 h-5/6 absolute top-0 left-full ${
          extend && "-translate-x-full"
        }`}
      >
        <MemberList />
      </div>
      <button
        onClick={() => {
          setExtend(!extend);
        }}
        className="absolute bottom-12 right-12 bg-neutral-800 h-14 w-14 rounded-full "
      >
        P
      </button>
    </div>
  );
};

export default ChannelSideBar;
