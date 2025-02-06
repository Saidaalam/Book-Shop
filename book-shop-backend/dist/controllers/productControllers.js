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
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductById = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    // Validate if the ID is a valid ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product); // Return response with product details
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching product", error });
    }
});
exports.getProductById = getProductById;
// Add new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Product_1.default(req.body);
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});
exports.addProduct = addProduct;
// Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate if the ID is a valid ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
    }
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, // Use _id here
        req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
        }
        else {
            res.json(updatedProduct);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});
exports.updateProduct = updateProduct;
// Delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate if the ID is a valid ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
    }
    try {
        const deletedProduct = yield Product_1.default.findByIdAndDelete(id); // Use _id here
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
        }
        else {
            res.json({ message: "Product deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});
exports.deleteProduct = deleteProduct;
