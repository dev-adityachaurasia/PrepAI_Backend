import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
