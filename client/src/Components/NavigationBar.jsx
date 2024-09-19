import React, { useState } from "react";

const NavigationBar = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="w-screen overflow-x-clip flex items-center bg-black fixed top-0 h-16   text-white">
      <div className="w-full h-full justify-between p-5 hidden lg:flex">
        <div className="flex items-center w-2/6">Logo and Company Name</div>
        <div className="flex items-center w-2/6 justify-evenly">
          <button className="hover:underline hover:scale-105">Link 1</button>
          <button className="hover:underline">Link 2</button>
          <button className="hover:underline">Link 3</button>
          <button className="hover:underline">Link 4</button>
        </div>
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
          <div className="flex items-center flex-col h-full w-full p-10">
            <button className="hover:underline hover:scale-105">Link 1</button>
            <button className="hover:underline">Link 2</button>
            <button className="hover:underline">Link 3</button>
            <button className="hover:underline">Link 4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
