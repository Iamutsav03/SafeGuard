//routes
import express from "express";
import {registerUser,loginUser} from "../controllers/userRegistration.controller.js";
import {addContact} from "../controllers/userDashboard.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", verifyToken, loginUser);
userRoute.post("/addContact", verifyToken, addContact);

export default userRoute;