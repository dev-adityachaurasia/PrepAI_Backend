import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/generate-token.js";
import generateUsername from "../utils/username-generate.js";
import isEmail from "../utils/isEmail.js";

export const signIn = async (req, res) => {
  try {
    const { email, name, password, gender } = req.body;
    const username = await generateUsername(name, email);
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "Already have account",
        success: false,
      });
    }
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await User.create({
          username,
          email,
          name,
          password: hash,
          gender,
        });
        const token = getToken(user);
        res.status(200).json({
          message: "Created Account Successfully",
          success: true,
          token,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { value, password } = req.body;
    let user;
    // Check if login is by email or username
    if (isEmail(value)) {
      user = await User.findOne({ email: value }).select(
        "email username password"
      );
    } else {
      user = await User.findOne({ username: value }).select(
        "email username password"
      );
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Verify password
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(401).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    // Generate token
    const token = getToken(user);

    // Set the token as a cookie
    return res.status(200).json({
      message: `Welcome ${user.name}`,
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
