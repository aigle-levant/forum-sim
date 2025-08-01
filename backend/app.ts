import express from "express";
import dashboard from "./src/routes/dashboard.ts";
import auth from "./src/routes/auth.ts";
import publicRoute from "./src/routes/publicRoute.ts";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// use defined routes
app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/public", publicRoute);

app.listen(port, () => {
  console.log(`Server runs on port ${port}!`);
});

export default app;
