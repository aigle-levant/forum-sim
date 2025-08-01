import express from "express";

const router = express.Router();

// TODO: create authenticateToken for usage

router.get("/profile"); // get user's profile
router.get("/post"); // post something
router.get("/posts"); // see all of user's posts
// ai generated comments included

export default router;
