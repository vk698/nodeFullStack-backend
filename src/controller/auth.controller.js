import User from "../models/register.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileUpload } from "../storage/storage.js";
import dotnev from "dotenv";
dotnev.config();

const createJwtToken = (payload, secret) => {
  return jwt.sign({ userId: payload }, secret, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: newPassword });

    const token = await createJwtToken(newUser._id, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error 01" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("COOKIE_DOMAIN", process.env.COOKIE_DOMAIN);

    const user = await User.findOne({ email });

    console.log("DATA", user._id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect " });
    }

    const token = await createJwtToken(user._id, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login Successfull", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
