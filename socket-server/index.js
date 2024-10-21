const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = 4000;
require('dotenv').config();
const cors = require("cors");
const { roomHandler } = require("./socketHandlers/RoomHandler");
const connectToMongo = require("./DB/db");
connectToMongo()

const server = http.createServer(app);

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use("/user",require("./Routes/UserRoute"))
app.use("/channel",require("./Routes/ChannelRoutes"))
app.use("/document",require("./Routes/DocumentRoutes"))

// Remove Later For testing only
app.use("",require("./Routes/TempRoutes"))



// Real Time Data Handling

const channelMap = {}

io.on("connection", (socket) => {
  roomHandler(socket, channelMap);
  // console.log("Socket Connected");
  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server Active on port ${port}`);
});
