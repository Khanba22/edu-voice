const { v4 } = require("uuid");

const roomHandler = (socket, rooms, peerMaps) => {
  const joinRoom = ({ roomId, peerId, username }) => {};
  const createRoom = () => {
    const roomId = v4().split("-")[0];
    rooms[roomId] = {
      members: {},
      chats: [],
      peerIds: {},
    };
    socket.join(roomId);
    socket.emit("room-created", { roomId });
  };

  const getUsers = ({ roomId }) => {};

  const disconnectUser = ({ roomId, username, peerId }) => {};

  socket.on("get-users", getUsers);
  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
  socket.on("disconnect", disconnectUser);
};

module.exports = { roomHandler };
