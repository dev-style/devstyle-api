require("otenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import { IAmbassador } from "../lib/interfaces";

const userSchema: Schema<IAmbassador> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {},
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
