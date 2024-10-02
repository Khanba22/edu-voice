const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const Channel = require("../Models/ChannelSchema");
const Note = require("../Models/NotesSchema");

// Get user details
router.post("/get-user", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

// Get all channels for a user
router.post("/get-channels", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("channels");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ channels: user.channels });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving channels", error });
  }
});

// Get all notes
router.get("/get-notes", async (req, res) => {
  try {
    const notes = await Note.find();

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notes", error });
  }
});

// Create a new user
router.post("/create-user", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username,
      password,
      email,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
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

    await Channel.updateMany(
      { members: userId },
      { $pull: { members: userId } }
    );

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
