import React, { useContext, useState } from "react";
import CrossButton from "./CrossButton";
import { UserContext } from "../Contexts/UserContext";
import { ChannelContext } from "../Contexts/ChannelContext";
const AddChannelPopup = ({ show, setShowPopUp }) => {

  const { userDetails }=  useContext(UserContext)
  const [channelName, setChannelName] = useState("")
  const {getChannels} = useContext(ChannelContext)

  const createChannel = async()=>{
    const userId = userDetails._id
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/channel/create-channel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId,channelName})
      }
    )
    if (res.ok) {
      setShowPopUp(false)
      getChannels()
    }
  }

  return (
    <div className="backdrop-blur h-full w-full relative flex justify-center items-center">
      <CrossButton setShowPopUp={setShowPopUp} />
      <div className="h-3/5 w-3/6 bg-white rounded flex flex-col items-center justify-center">
        <label htmlFor="">Channel Name</label>
        <input value={channelName} onChange={(e)=>{setChannelName(e.target.value)}} type="text" placeholder="Enter Channel Name" />
        <button onClick={createChannel}>Create</button>
      </div>
    </div>
  );
};

export default AddChannelPopup;
