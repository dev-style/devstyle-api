import mongoose, { Document, Model, Schema } from "mongoose";
import { ISocial } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";

const socialSchema = new Schema<ISocial>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
      min: 1
    },
    name: {
      type: String,
      required: true
    }
  },

  { timestamps: true }
);

socialSchema.plugin(DiffPlugin);

const SocialModel: Model<ISocial> = mongoose.model("Social", socialSchema);

export default SocialModel;
