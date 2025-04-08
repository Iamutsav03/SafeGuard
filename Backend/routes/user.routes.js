//routes
import express from "express";
import {registerUser,loginUser} from "../controllers/userRegistration.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", verifyToken, loginUser);

export default userRoute;