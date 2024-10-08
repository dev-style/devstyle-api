require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IAffiliation } from "../lib/interfaces";

const AffiliationSchema: Schema<IAffiliation> = new mongoose.Schema(
  {
    ambassador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ambassador",
      required: true,
    },
    affiliateCode: {
      type: String,
      required: true,
    },
   

    clicksCount: {
      type: Number,
      default: 0,
      require: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

AffiliationSchema.plugin(DiffPlugin);

const AffiliationModel: Model<IAffiliation> = mongoose.model(
  "Affiliation",
  AffiliationSchema
);

export default AffiliationModel;
