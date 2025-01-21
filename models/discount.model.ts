require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IDiscount } from "../lib/interfaces";

const discountSchema: Schema<IDiscount> = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    percent: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    limit: { type: Number, required: true },
    uses: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

discountSchema.plugin(DiffPlugin);

const CollectionModel: Model<IDiscount> = mongoose.model(
  "Discount",
  discountSchema
);

export default CollectionModel;
