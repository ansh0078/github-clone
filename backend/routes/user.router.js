import express from "express";
import {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/allUsers", getAllUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/userProfile", getUserProfile);
userRouter.purge("/updateProfile", updateUserProfile);
userRouter.delete("/deleteProfile", deleteUserProfile);

export default userRouter;
