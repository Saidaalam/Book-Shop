"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        let user = yield User_1.default.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create new user with default role "user"
        user = new User_1.default({ name, email, password: hashedPassword, role: "user" });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        // Compare passwords
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
// Get Current User (Protected Route)
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getCurrentUser = getCurrentUser;
// Logout (Client-side removes the token)
const logoutUser = (req, res) => {
    res.json({ message: "Logout successful" });
};
exports.logoutUser = logoutUser;
