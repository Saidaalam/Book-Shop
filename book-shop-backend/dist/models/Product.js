"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
