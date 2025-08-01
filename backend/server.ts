import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: "../.env" });
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
