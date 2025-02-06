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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const Order_1 = require("../models/Order");
// Create Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookId, quantity, totalPrice } = req.body;
        const newOrder = new Order_1.Order({ userId, bookId, quantity, totalPrice });
        yield newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});
exports.createOrder = createOrder;
// Get All Orders
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find().populate("userId").populate("bookId");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});
exports.getOrders = getOrders;
// Get Single Order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.Order.findById(req.params.id).populate("userId").populate("bookId");
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
});
exports.getOrderById = getOrderById;
// Update Order Status
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const updatedOrder = yield Order_1.Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder)
            return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order status updated", order: updatedOrder });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
});
exports.updateOrderStatus = updateOrderStatus;
// Delete Order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield Order_1.Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder)
            return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});
exports.deleteOrder = deleteOrder;
