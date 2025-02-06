import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  name:string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);