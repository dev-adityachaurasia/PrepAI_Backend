import express from "express";
import dbConnect from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config({});

const PORT = 8000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running......");
});

app.use("/", userRoutes);

app.listen(PORT, (res, req) => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
