import express from "express";
import cors from "cors";
import path from "path";
import dashboard from "./src/routes/dashboard";
import auth from "./src/routes/auth";
import publicRoute from "./src/routes/publicRoute";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/public", publicRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

export default app;
