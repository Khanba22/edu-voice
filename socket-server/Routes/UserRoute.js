const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const Channel = require("../Models/ChannelSchema");
const Note = require("../Models/NotesSchema");
const zod = require('zod');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET  = require('../Config/config');
// const cors = require('cors');

// router.use(cors());

// Get user details
router.get("/get-user", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.find().populate("channels");

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

router.post('/login', async (req,res)=> {
  try {
    const {username, password, remember} = req.body;
    const loginSchema = zod.object({
      username: zod.string().min(8),
      password: zod.string().min(8),
    })
    const success = loginSchema.safeParse({
      username,
      password
    });

    if(!success) {
      return res.status(400).json({ message: "Invalid input from success" });
    } else {
      // const token = jwt.sign({username:username}, JWT_SECRET);
      // const user = await User.findOne({username: token});
      const user = await User.findOne({username: username});
      // console.log(username)
      if(username != user.username) {
        return res.status(100).json({
          message: "Invalid Credentials username not found",
          result : false
        });
      } else {
        if(username == user.username && password == user.password) {
          return res.status(200).json({
            message: 'Successfully Logged In',
            result: true
          });
        } else {
          return res.status(400).json({
            message: "Invalid Credentials",
            result : false
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error
    })

    // console.log(error);
  }
})

// Create a new user
router.post("/create-user", async (req, res) => {
  const userSchema = zod.object({
    username: zod.string().min(8),
    password: zod.string().min(8),
    email: zod.string().email(),
  })
  try {
    const { username, password, email } = req.body;
    const result = userSchema.safeParse({
      username,
      password,
      email,
    })

    if(!result) {
      return res.status(400).json({ message: "Invalid input" });
    } else {
        const user = await User.findOne({ email });
        if(user) {
          return res.status(400).json({ message: "Email already exists" });
        } 
        else {
          // const token = jwt.sign({username: username}, JWT_SECRET);
          const newUser = new User({
            username,
            password,
            email,
          });
          const savedUser = await newUser.save();
          res.status(201).json({ message: "User created", user: savedUser, success: true });
      }
    }
    
  } catch (e) {
    console.log(e);
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
