import React, { useState } from "react";

const ChannelSideBar = () => {
  const [extend, setExtend] = useState(false);
  return (
    <div className="h-full relative w-1/12 bg-slate-800">
      <div className="h-5/6 bg-purple-700">
        ONLINE USERS
      </div>
      <div className={`transition w-96 h-5/6 absolute top-0 left-full ${extend && "-translate-x-full"} bg-green-500`}>
        CHat Space
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
