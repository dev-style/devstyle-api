import mongoose, { Model, Schema } from "mongoose";
import { ISize } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";

const sizeSchema = new Schema<ISize>(
  {
    size: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

sizeSchema.plugin(DiffPlugin);

const SizeModel: Model<ISize> = mongoose.model("Size", sizeSchema);

export default SizeModel;
