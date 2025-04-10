import express from "express";
import { upload } from "../middleware/multer.js"; // your multer file
const router = express.Router();

router.post("/upload", upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  const audioFile = req.files['audio']?.[0]?.filename;
  const photoFile = req.files['photo']?.[0]?.filename;

  res.status(200).json({
    message: "Files uploaded successfully.",
    audio: audioFile,
    photo: photoFile
  });
});

export default router;
