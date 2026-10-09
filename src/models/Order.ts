import mongoose, { Schema, Model, Types } from "mongoose";

export interface IRental {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupTime?: string;
  returnTime?: string;
  days?: number;
  notes?: string;
}

export interface IOrder {
  _id?: Types.ObjectId | string;
  user?: Types.ObjectId | string;
  car?: Types.ObjectId | string;
  totalAmount?: number;
  currency?: string;
  type?: string;
  status?: "pending" | "paid" | "cancelled" | "completed";
  rental?: IRental;
  stripeSessionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RentalSchema = new Schema<IRental>(
  {
    pickupLocation: { type: String, default: "" },
    dropoffLocation: { type: String, default: "" },
    pickupDate: { type: String },
    returnDate: { type: String },
    pickupTime: { type: String },
    returnTime: { type: String },
    days: { type: Number, default: 1 },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    car: { type: Schema.Types.ObjectId, ref: "Car" },
    totalAmount: { type: Number, default: 0 },
    currency: { type: String, default: "TRY" },
    type: { type: String, default: "rental" },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "completed"],
      default: "pending",
    },
    rental: { type: RentalSchema, default: {} },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
