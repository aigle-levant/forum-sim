// modules
const express = require("express");
const rateLimit = require("express-rate-limit");
// files
const {
  login,
  register,
  getUserProfile,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again later.",
});

const router = express.Router();

// send signup and login page to server
// then to client when having this link
router.post("/register", register);
router.post("/login", limiter, login);
router.get("/profile", verifyToken, getUserProfile);

module.exports = {
  router,
  limiter,
};
