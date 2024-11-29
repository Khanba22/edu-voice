import React, { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../Contexts/ChannelContext";
import { UserContext } from "../Contexts/UserContext";

const MemberList = () => {
  const { selectedChannel } = useContext(ChannelContext);
  const [members, setMembers] = useState([]);
  const { userDetails } = useContext(UserContext);
  const [email, setEmail] = useState("");

  const getMembers = async () => {
    if (!selectedChannel || !userDetails) {
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/channel/get-members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId: selectedChannel._id }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      setMembers(data.members);
    }
  };

  useEffect(() => {
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel]);

  const addMember = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/channel/add-member`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelId: selectedChannel._id,
          userId: userDetails._id,
          newMemberEmail: email,
        }),
      }
    );
    const data = await res.json();
    if (res.status !== 200) {
      alert(data.message);
      return;
    }
    setEmail("");
    getMembers();
  };

  return (
    selectedChannel && (
      <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Members of Channel: <span className="text-blue-500">{selectedChannel.name}</span>
        </h1>
        
        {/* Add Member Section */}
        {selectedChannel.admins.includes(userDetails._id) && (
          <div className="mb-6 flex items-center space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter member's email"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addMember}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add
            </button>
          </div>
        )}

        {/* Member List */}
        <div className="mt-6 space-y-4">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {member.username}
                  </h2>
                  {member.isAdmin && (
                    <span className="text-sm text-blue-500 font-semibold">
                      (Admin)
                    </span>
                  )}
                </div>
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
