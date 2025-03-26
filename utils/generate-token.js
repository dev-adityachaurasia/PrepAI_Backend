import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

export const getToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
  return token;
};

export const decodeToken = (token) => {
  const value = jwt.verify(token, "SECRET_KEY");
  return value.userId;
};
