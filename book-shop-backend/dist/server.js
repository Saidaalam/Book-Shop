"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoURI = process.env.mongoURI || "mongodb+srv://alamsaida18:tp2ubxBspfGzAG24@cluster0.3tkip.mongodb.net/bookshop?retryWrites=true&w=majority";
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
// MongoDB connection
mongoose_1.default.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.error("MongoDB connection error:", error));
// Routes
app.use("/products", productRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the Book Shop API');
});
// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
