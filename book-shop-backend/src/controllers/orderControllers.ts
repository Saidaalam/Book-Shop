import { Request, Response } from "express";
import { Order } from "../models/Order";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, bookId, quantity, totalPrice } = req.body;
    const newOrder = new Order({ userId, bookId, quantity, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("userId").populate("bookId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get Single Order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId").populate("bookId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
