import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    audioUrl: {
      type: String,
    },
  },
  { timestamps }
);

const alert = mongoose.Model("Alert", alertSchema);

export default alert;
