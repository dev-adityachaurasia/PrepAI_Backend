import mongoose from "mongoose";

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aadichaurasia00:lv5fjsNnupTItO1f@cluster0.zxsgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/PrepAi"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
