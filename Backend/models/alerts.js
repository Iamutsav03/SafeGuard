import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    location: [
      {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    ],
    imageUrl: {
      type: String,
    },
    audioUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
