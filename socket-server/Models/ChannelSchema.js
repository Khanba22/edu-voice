const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
  channelName: String,
  members: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
  chats: [{
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    timestamp: Date
  }],
  createDate: Date,
  admins: [mongoose.Schema.Types.ObjectId] // Add admins field if not already present
});


module.exports = mongoose.model("Channel", ChannelSchema);
