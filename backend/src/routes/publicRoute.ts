import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../index.html"));
});
router.get("/about", (req, res) => {
  res.send("About page");
});
router.get("/contact", (req, res) => {
  res.send("Contact page");
});
router.get("/terms-and-conditions", (req, res) => {
  res.send("Terms and conditions apply");
});

export default router;
