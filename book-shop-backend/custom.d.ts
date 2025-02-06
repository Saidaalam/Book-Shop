import { Request } from "express";

// Extend Express' Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}
