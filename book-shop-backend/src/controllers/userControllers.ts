import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      console.log('Received login request:', req.body);
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      res.json({ message: 'Login successful', user: { email: user.email, name: user.name } });
    } catch (error: unknown) { 
      if (error instanceof Error) {  // Check if error is of type 'Error'
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
      } else {
        console.error('An unknown error occurred');
        res.status(500).json({ message: 'Server error' });
      }
    }
  };
  

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "-password"); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
