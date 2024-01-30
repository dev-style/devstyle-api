require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IGoodie } from "../lib/interfaces";

const goodieSchema: Schema<IGoodie> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    fromCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    promoPercentage: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    inPromo: {
      type: Boolean,
      required: true,
    },
    views: {
      type: Number,
    },
    size: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    mainImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    availableColors: [String],
    backgroundColors: [String],

    likes: {
      type: Number,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

goodieSchema.plugin(DiffPlugin);

const GoodieModel: Model<IGoodie> = mongoose.model("Goodie", goodieSchema);

export default GoodieModel;
