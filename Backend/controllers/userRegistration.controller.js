import User from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAccessTokenANDRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = userId.generateAccessToken();
  const refreshToken = userId.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password, phone });

  return res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or username doesn't exist" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Invalid credentials : Incorrect Password" });
  }

    const { accessToken, refreshToken } = await generateAccessTokenANDRefreshToken(
        user._id
    );

    const option = {
        httpOnly : true,
        secure: true
    }
  return res.status(200)
  .cookie("accessToken", accessToken, option)
  .cookie("refreshToken", refreshToken, option)
  .json({
    status: "success",
    message: "User logged in successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    },
  });
});

export {registerUser , loginUser};
