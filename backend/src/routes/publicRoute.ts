import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home page");
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
