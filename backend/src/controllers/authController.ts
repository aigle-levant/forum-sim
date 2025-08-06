// modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// files
const { User } = require("../models/User");
// types
import type { Request, Response } from "express";

interface jwtUser {
  userId: string;
}

interface authReq extends Request {
  user?: jwtUser;
}

// register
const register = async (req: Request, res: Response) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// login
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if user doesnt exist
    // be vague, dont be specific on WHAT
    // is wrong
    if (!user) {
      return res.status(401).json({ error: "Authentication failed." });
    }
    if (user.isLocked) {
      return res.status(423).json({
        message: "Account locked. Try again later.",
      });
    }
    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    // if again, passwords dont match
    // be vague
    // make life of hackerman miserable
    if (!doPasswordsMatch) {
      await user.loginAttempts();
      return res.status(401).json({ error: "Authentication failed." });
    }
    // whew, now we create tokens
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    // hurrah, we done
    res.status(200).json({ token });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};

// get the damn profile
const getUserProfile = async (req: authReq, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    // if the user isnt found, say user not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
};
