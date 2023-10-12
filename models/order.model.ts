require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IOrder } from "../lib/interfaces";

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    initDate: { type: Date, default: Date.now() },
    endDate: { type: Date },
  },

  { timestamps: true }
);

orderSchema.plugin(DiffPlugin);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default OrderModel;
