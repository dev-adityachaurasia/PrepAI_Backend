import express from "express";
import { login, signIn } from "../controllers/user-controller.js";
import otpVerify from "../utils/verify-email.js";

const router = express.Router();

// User registration and authentication
router.post("/auth/register", signIn);
router.post("/auth/login", login);
router.post("/auth/otp", otpVerify);
// router.post("/auth/logout", logout);

// // User account management
// router.delete("/users/:userToDeleteId", deleteUser); // Changed to DELETE for account deletion
// router.put("/users/password", updatePassword);

// // Profile and suggestions
// router.get("/users/:username", getProfile); // To fetch a specific user profile
// router.post("/users/check-username", checkUsername); // Username availability check
// router.get("/users/suggestions", suggestUser); // Changed to GET for user suggestions

// // Profile updates
// router.put("/users/profile", upload.single("profilePic"), editProfile); // Changed to PUT for profile edit
// router.post("/users/:username/follow", followUnfollow); // Follow/unfollow action

export default router;
