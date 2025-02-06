import { Request, Response } from "express";
import Product from "../models/Product";
import mongoose from "mongoose";

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<Response<any>> => {
  const productId = req.params.id;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product); // Return response with product details
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product", error });
  }
};



// Add new product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid product ID' });
    return;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,  // Use _id here
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid product ID' });
    return;
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);  // Use _id here
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
