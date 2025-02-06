import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default role "user"
    user = new User({ name, email, password: hashedPassword, role: "user" });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Current User (Protected Route)
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout (Client-side removes the token)
export const logoutUser = (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};
