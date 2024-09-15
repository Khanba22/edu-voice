const URI = process.env.MONGO_CONNECTION_URI || "";
const mongoose = require("mongoose");

const connectToMongo = async () => {
  await mongoose.connect(URI).catch((err) => {
    console.log("Cannot Connect To Database");
  });
  console.log("Connection Successful");
};

module.exports = connectToMongo;
