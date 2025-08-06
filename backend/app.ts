// modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
// files
import dashboard from "./src/routes/dashboard";
import auth from "./src/routes/auth";
import publicRoute from "./src/routes/publicRoute";

// global rate limiter
const globalLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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

export default app;
