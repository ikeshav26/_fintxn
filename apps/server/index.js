import dotenv from "dotenv";
dotenv.config()
import app from "./src/app.js";
import { connectDB } from "./src/config/DB.js";

connectDB()

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});