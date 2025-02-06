import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoURI = process.env.MONGO_URI || "mongodb+srv://alamsaida18:tp2ubxBspfGzAG24@cluster0.3tkip.mongodb.net/bookshop";


mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
