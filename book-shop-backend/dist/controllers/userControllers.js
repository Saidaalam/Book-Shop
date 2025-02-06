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
exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log('Received login request:', req.body);
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', user: { email: user.email, name: user.name } });
    }
    catch (error) {
        if (error instanceof Error) { // Check if error is of type 'Error'
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            console.error('An unknown error occurred');
            res.status(500).json({ message: 'Server error' });
        }
    }
});
exports.loginUser = loginUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}, "-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUsers = getUsers;
