import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productControllers";

const router = express.Router();

// Routes
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get product by ID
router.post("/", addProduct); // Add a new product
router.put("/:id", updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Delete a product

export default router;
