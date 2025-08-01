import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { error } from "console";

const router = express.Router();

// send signup and login page to server
// then to client when having this link
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // if user already exists, return 400 and tell
    // them to use the login
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already registered. Please login." });
    }

    // if not, create and save this user
    const newbie = new User({ email, password, name });
    await newbie.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if user doesnt exist
    // be vague, dont be specific on WHAT
    // is wrong
    if (!user) {
      return res.status(401).json({ error: "Authentication failed." });
    }
    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    // if again, passwords dont match
    // be vague
    // make life of hackerman miserable
    if (!doPasswordsMatch) {
      return res.status(401).json({ error: "Authentication failed." });
    }
    // whew, now we create tokens
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // hurrah, we done
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
