import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the expected shape of the decoded JWT payload
interface JwtPayload {
  userId: string;
  role: string;
}

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Change this in production!

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
