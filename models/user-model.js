import mongooose from "mongoose";

const userSchema = new mongooose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // ✅ Only these values are allowed
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongooose.model("User", userSchema);
