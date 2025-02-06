import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import express from 'express';
import cors from 'cors';

dotenv.config(); 

const app = express();

const mongoURI = process.env.mongoURI || "mongodb+srv://alamsaida18:tp2ubxBspfGzAG24@cluster0.3tkip.mongodb.net/bookshop?retryWrites=true&w=majority";


app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Shop API');
});

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
