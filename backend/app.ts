// modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
// files
const dashboard = require("./src/routes/dashboard");
const auth = require("./src/routes/auth");
const publicRoute = require("./src/routes/publicRoute");
// types
import { Request, Response } from "express";

// global rate limiter
const globalLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.use(
  cors({
    origin: "https://forum-sim.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
// use global limiter
app.use(globalLimit);
// setup routes
app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/public", publicRoute);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = app;
