require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IHeroSection } from "../lib/interfaces";

const heroSectionSchema: Schema<IHeroSection> = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

heroSectionSchema.plugin(DiffPlugin);

const HeroSectionModel: Model<IHeroSection> = mongoose.model(
  "HeroSection",
  heroSectionSchema
);

export default HeroSectionModel;
