const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const Channel = require("../Models/ChannelSchema");
const Note = require("../Models/NotesSchema");

// Middleware to check if the user is an admin of the channel
const isAdmin = async (req, res, next) => {
  const { userId, channelId } = req.body;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (!channel.admins.includes(userId)) {
      return res.status(403).json({ message: "You are not an admin" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking admin status", error });
  }
};

// Get user details
router.get("/get-user", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate("channels");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

// Get all channels for a user
router.get("/get-channels", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate("channels");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ channels: user.channels });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving channels", error });
  }
});

// Get all members of a channel
router.post("/get-members", async (req, res) => {
  try {
    const { channelId } = req.body;
    const channel = await Channel.findById(channelId).populate("members");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const data = channel.members.map((member) => {
      if (channel.admins.includes(member._id)) {
        return { ...member._doc, isAdmin: true };
      }
      return { ...member._doc, isAdmin: false };
    })

    console.log(data);

      res.status(200).json({ members: data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving members", error });
  }
});

// Get all chats in a channel
router.get("/get-chats", async (req, res) => {
  try {
    const { channelId } = req.query;

    // Find the channel by ID and populate the sender field
    const channel = await Channel.findById(channelId).populate({
      path: "chats.sender",
      select: "username",
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Map over the chats to replace sender ID with username
    const chatsWithUsernames = channel.chats.map((chat) => ({
      text: chat.text,
      sender: chat.sender ? chat.sender.username : "Unknown", // Replace sender ID with username
      timestamp: chat.timestamp,
    }));

    res.status(200).json({ chats: chatsWithUsernames });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving chats", error });
  }
});

// Search chats in a channel
router.get("/search-chats", async (req, res) => {
  try {
    const { channelId, query } = req.query;
    const regex = new RegExp(query, "i");

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Perform pattern-based search using regex
    const matchingChats = channel.chats.filter((chat) => regex.test(chat));
    res.status(200).json({ matchingChats });
  } catch (error) {
    res.status(500).json({ message: "Error searching chats", error });
  }
});

// Add a member to a channel (Admin only)
router.post("/add-member", async (req, res) => {
  try {
    const { channelId, userId, newMemberEmail } = req.body;

    const channel = await Channel.findById(channelId);
    console.log(channel);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (!channel.admins.includes(userId)) {
      return res.status(403).json({ message: "Only admins can add members" });
    }

    const newMember = await User.findOne({ email: newMemberEmail });
    if (!newMember) {
      return res.status(404).json({ message: "New member not found" });
    }

    if (channel.members.includes(newMember._id)) {
      return res
        .status(400)
        .json({ message: "User is already a member of this channel" });
    }

    channel.members.push(newMember._id);
    await channel.save();

    newMember.channels.push(channelId);
    await newMember.save();

    res.status(200).json({ message: "Member added to channel successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding member to channel", error });
  }
});

// Remove a member from a channel (Admin only)
router.post("/remove-member", isAdmin, async (req, res) => {
  try {
    const { channelId, memberId } = req.body;
    const channel = await Channel.findById(channelId);

    if (!channel.members.includes(memberId)) {
      return res.status(400).json({ message: "Member is not in this channel" });
    }

    channel.members.pull(memberId);
    await channel.save();

    const member = await User.findById(memberId);
    if (member) {
      member.channels.pull(channelId);
      await member.save();
    }

    res
      .status(200)
      .json({ message: "Member removed from channel successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing member from channel", error });
  }
});

// Add a chat message to a channel
router.post("/add-message", async (req, res) => {
  try {
    const { channelId, text, senderId } = req.body;
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const message = {
      text,
      sender: senderId, // Add sender ID
      timestamp: new Date(),
    };

    channel.chats.push(message);
    await channel.save();

    res.status(200).json({ message: "Message added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding message", error });
  }
});

// Create a new channel
router.post("/create-channel", async (req, res) => {
  try {
    const { userId, channelName } = req.body;

    const newMember = await User.findById(userId);

    const newChannel = new Channel({
      channelName,
      members: [userId],
      admins: [userId], // The creator is the default admin
      chats: [],
      createDate: new Date(),
    });

    await newChannel.save();
    console.log(newChannel);
    newMember.channels.push(newChannel._id);
    await newMember.save();
    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: "Error creating channel", error });
  }
});

// Remove a channel (Admin only)
router.post("/remove-channel", isAdmin, async (req, res) => {
  try {
    const { channelId } = req.body;

    // Find and delete the channel
    const channel = await Channel.findByIdAndDelete(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Remove the channel from all users' channels
    await User.updateMany(
      { channels: channelId },
      { $pull: { channels: channelId } }
    );

    res
      .status(200)
      .json({ message: "Channel removed and updated from users' lists" });
  } catch (error) {
    res.status(500).json({ message: "Error removing channel", error });
  }
});

// Add an admin to a channel (Admin only)
router.post("/add-admin", isAdmin, async (req, res) => {
  try {
    const { channelId, newUserId } = req.body;
    const channel = await Channel.findById(channelId);

    if (!channel.admins.includes(newUserId)) {
      channel.admins.push(newUserId);
      await channel.save();
    }

    res.status(200).json({ message: "Admin added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding admin", error });
  }
});

// Remove an admin from a channel (Admin only)
router.post("/remove-admin", isAdmin, async (req, res) => {
  try {
    const { channelId, userId } = req.body;
    const channel = await Channel.findById(channelId);

    if (channel.admins.length === 1 && channel.admins.includes(userId)) {
      return res.status(403).json({ message: "Cannot remove the last admin" });
    }

    channel.admins.pull(userId);
    await channel.save();

    res.status(200).json({ message: "Admin removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing admin", error });
  }
});

// Delete a user
router.post("/delete-user", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from any channels they are a member of
    await Channel.updateMany(
      { members: userId },
      { $pull: { members: userId, admins: userId } }
    );

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
