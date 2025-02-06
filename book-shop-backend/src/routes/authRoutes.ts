import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Register User Route
router.post('/register', registerUser);

// Login User Route
router.post("/login", loginUser);

// Get Current User (Protected route)
router.get('/current', authMiddleware, getCurrentUser);

export default router;
