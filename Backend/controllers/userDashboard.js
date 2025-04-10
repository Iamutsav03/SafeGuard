
import Contact from "../models/contacts.js";
import User from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import client from "../config/twilio.js";

export const addContact = asyncHandler(async (req, res) => {
  const { id, name, phone, email } = req.body;
  if (!id || !name || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields: id, name, phone, and email.",
    });
  }

  const dataEntry = await Contact.create({ name, phone, email });
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Invalid credentials.",
    });
  }

  await User.updateOne({ _id: id }, { $push: { contacts: dataEntry._id } });

  res.status(200).json({
    success: true,
    message: "Contact added successfully.",
    data: dataEntry,
  });
});
export const sendMessage = asyncHandler(async (req, res) => {
  const { to, latitude, longitude } = req.body;
  const message = `My location: Lat ${latitude}, Lng ${longitude}`;

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
  message,
      to: to,
    });
    res.status(200).json({
      status: "success",
      sid: response.sid,
      to,
      message,
    });
  } catch (error) {
    res.status(500).json( {
      status: "error",
      error: error.message,
      to,
      message,
    });
  }
});
export const getLocation = asyncHandler((req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);
  res.status(200).json({
    success: true,
    data: { longitude, latitude },
  });
});
