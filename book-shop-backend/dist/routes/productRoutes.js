"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const router = express_1.default.Router();
// Routes
router.get("/", productControllers_1.getAllProducts); // Get all products
router.get("/:id", productControllers_1.getProductById); // Get product by ID
router.post("/", productControllers_1.addProduct); // Add a new product
router.put("/:id", productControllers_1.updateProduct); // Update a product
router.delete("/:id", productControllers_1.deleteProduct); // Delete a product
exports.default = router;
