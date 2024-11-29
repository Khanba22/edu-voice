import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../Contexts/AuthContext"

const NavigationBar = () => {
  const [show, setShow] = useState(true);
  const [hideExtra, setHideExtra] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-screen overflow-x-clip flex items-center bg-black fixed z-50 top-0 h-16 text-white">
      <div className="w-full h-full justify-between relative p-5 hidden lg:flex">
        <div className="flex items-center w-2/6">EDU VOICE</div>
        <div className="flex items-center w-2/6 justify-evenly">
          <Link to="/">
            <button className="hover:underline hover:scale-105">Home</button>
          </Link>
          <Link to="/channel">
            <button className="hover:underline hover:scale-105">Channel</button>
          </Link>
          <button
            className="hover:underline"
            onClick={() => {
              setHideExtra(!hideExtra);
            }}
          >
            Login/Logout
          </button>
        </div>
        <div
          className={`absolute right-0 bottom-0 transition ${
            hideExtra ? "-translate-y-60" : "translate-y-44"
          } h-44 w-36 bg-yellow-700`}
        >
          <button
            onClick={() => {
              setHideExtra(!hideExtra);
              navigate("/auth");
              logout();
            }}
          >
            Logout
          </button>
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
