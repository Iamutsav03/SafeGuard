import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 15,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
  },
  {
    timestamps: true,
  }
);

const contact = mongoose.model("Contact", contactSchema);
export default contact;
