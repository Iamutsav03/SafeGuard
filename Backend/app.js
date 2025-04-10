import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import { getLocation, sendMessage } from "./controllers/userDashboard.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/user" , userRoute);

app.post("/api/share-location",verifyToken,getLocation)
app.post("/send-sms",verifyToken,sendMessage);

export default app;
