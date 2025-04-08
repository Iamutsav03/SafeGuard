import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // <- Required for token generation

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    alerts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alert",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate Access Token
usersSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate Refresh Token
usersSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Compare password for login
usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", usersSchema);
export default User;
