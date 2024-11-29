import React, { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../Contexts/ChannelContext";

const MemberList = () => {
  const { selectedChannel } = useContext(ChannelContext);
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    if (!selectedChannel) {
      return;
    }
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/channel/get-members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelId: selectedChannel._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data.members);
      });
  };

  useEffect(() => {
    getMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel]);

  const addMember = async () => {
    console.log("Adding member", selectedChannel._id);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/channel/add-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channelId: selectedChannel._id }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        alert("Only Admins Can add new members")
      })
      .then((data) => {
        console.log(data);
        if(data?.members){
          setMembers(data.members);
        }
      });
  };

  return (
    selectedChannel && (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Members of Channel
        </h1>
        <button
          onClick={addMember}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Members
        </button>
        <div className="mt-6 space-y-4">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id}
                className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg"
              >
                <h2 className="text-lg font-medium text-gray-700">
                  {member.username}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No members found.</p>
          )}
        </div>
      </div>
    )
  );
};

export default MemberList;
