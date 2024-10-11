import React from "react";
import CrossButton from "./CrossButton";

const AddChannelPopup = ({ show, setShowPopUp }) => {
  return (
    <div className="backdrop-blur h-full w-full relative flex justify-center items-center">
      <CrossButton setShowPopUp={setShowPopUp} />
      <div className="h-3/5 w-3/6 bg-white rounded">
        <label htmlFor="">Channel Name</label>
        <input type="text" placeholder="Enter Channel Name" />
      </div>
    </div>
  );
};

export default AddChannelPopup;
