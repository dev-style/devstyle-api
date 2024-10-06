require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { INotification } from "../lib/interfaces";

const notificationSchema: Schema<INotification> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "unread"
    }
  },
  { timestamps: true }
);

notificationSchema.plugin(DiffPlugin);

const NotificationModel: Model<INotification> = mongoose.model(
  "notification",
  notificationSchema
);

export default NotificationModel;
