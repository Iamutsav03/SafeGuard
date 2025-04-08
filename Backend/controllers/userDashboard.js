import Contact from "../models/contacts.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/users.model.js";

export const addContact = asyncHandler(async (req, res) => {
  const { id, name, phone, email } = req.body;
  if (!id || !name || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields: id, name, phone, and email.",
    });
  }
  const dataEntry = await Contact.create({
    name,
    phone,
    email,
  });
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Invalid credentials.",
    });
  }
  await User.updateOne(
    { _id: id },
    { $push: { contacts: dataEntry._id } }
  );

  res.status(200).json({
    success: true,
    message: "Contact added successfully.",
    data: dataEntry,
  });
});
