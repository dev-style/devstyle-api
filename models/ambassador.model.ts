require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import { IAmbassador } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";

const ambassadorSchema: Schema<IAmbassador> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    social: [
      {
        id: Schema.Types.Number,
        name: String,
        link: String
      }
    ],
    colors: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
ambassadorSchema.plugin(DiffPlugin);

const AmbassadorModel: Model<IAmbassador> = mongoose.model(
  "Ambassador",
  ambassadorSchema
);

export default AmbassadorModel;
