const messageHandler = (socket, rooms) => {
  const handleMessage = ({ sender, message, roomId }) => {
    const messageJson = {
      sender,
      message,
      time: new Date().toISOString(),
    };
    rooms[roomId].chats.push(messageJson);
    socket.to(roomId).emit("receive-message", messageJson);
    socket.emit("receive-message", messageJson);
  };

  socket.on("send-message", handleMessage);
};
