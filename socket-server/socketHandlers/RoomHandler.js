const { v4 } = require("uuid");

const roomHandler = (socket, channelMap) => {
  const joinAudioGroup = ({ channelId, username, peerId }) => {
    const channel = channelMap[channelId];
    if (!channel) {
      channelMap[channelId] = {
        channelId,
        members: [username],
        userIdMap: {
          [username]: { username, peerId },
        },
      };
    } else {
      channel.members.push(username);
      channel.userIdMap[username] = { username, peerId };
    }
    socket.join(channelId);
    socket.to(channelId).emit("user-joined", { peerId, username });
    socket.emit("user-joined", { peerId, username });
  };

  const leaveAudioGroup = ({ channelId, username }) => {
    const channel = channelMap[channelId];
    if (channel) {
      delete channel.userIdMap[username];
      console.log(channel);
      socket.emit("left-audio", { username, channelId });
    }
  };

  socket.on("join-audio", joinAudioGroup);
  socket.on("leave-audio", leaveAudioGroup);
  socket.on("disconnect", leaveAudioGroup);
};

module.exports = { roomHandler };
