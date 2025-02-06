"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Register User Route
router.post('/register', authControllers_1.registerUser);
// Login User Route
router.post("/login", authControllers_1.loginUser);
// Get Current User (Protected route)
router.get('/current', authMiddleware_1.authMiddleware, authControllers_1.getCurrentUser);
exports.default = router;
