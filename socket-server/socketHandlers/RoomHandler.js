const { v4 } = require("uuid");

const roomHandler = (socket, channelMap) => {
  const joinAudioGroup = ({ channelId, username, peerId }) => {
    console.log(channelId, username, peerId);
    const channel = channelMap[channelId];
    if (!channel) {
      channelMap[channelId] = {
        channelId,
        members: [username],
        socketIdMaps: {
          [socket.id]: { username, peerId },
        },
      };
    } else {
      channel.members.push(username);
      channel.socketIdMaps[socket.id] = { username, peerId };
    }
    console.log(`Joining ${channelId}`);
    socket.join(channelId);
    socket.to(channelId).emit("user-joined", { peerId, username });
    socket.emit("user-joined", { peerId, username });
  };

  const leaveAudioGroup = ({ channelId }) => {
    const channel = channelMap[channelId];
  };

  socket.on("join-audio", joinAudioGroup);
  socket.on("leave-audio", leaveAudioGroup);
  socket.on("disconnect", leaveAudioGroup);
};

module.exports = { roomHandler };
