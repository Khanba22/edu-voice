import React, { useState } from "react";

const NavigationBar = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="w-screen flex items-center bg-black sticky top-0 h-12 text-white">
      <div className="w-full h-full justify-between p-5 hidden lg:flex">
        <div className="flex items-center">Logo and Company Name</div>
        <div className="flex items-center">Button List</div>
      </div>
      <div className="w-full h-full relative justify-between flex p-5 lg:hidden">
        <div className="flex items-center">Logo and Company Name</div>
        <div className="flex z-10 items-center">
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Button Box
          </button>
        </div>
        <div
          className={`absolute transition top-0 left-0 ${
            show && "translate-x-full"
          }  w-screen h-screen bg-yellow-300`}
        >
          Slider
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
