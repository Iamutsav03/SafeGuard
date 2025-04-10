import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import imageRoutes from "./routes/sosInfo.routes.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/user", userRoute);

app.post("/api/share-location", (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);
  res.status(200).json({
    success: true,
    data: {
      longitude,
      latitude,
    },
  });
});


app.use("/api/audio", imageRoutes);
app.use("/api/image", imageRoutes);



export default app;
