require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import DiffPlugin from "mongoose-history-diff";
import { IAnnouncement } from "../lib/interfaces";

const announcementSchema: Schema<IAnnouncement> = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },

  { timestamps: true }
);

announcementSchema.plugin(DiffPlugin);

const AnnouncementModel: Model<IAnnouncement> = mongoose.model(
  "Announcement",
  announcementSchema
);

export default AnnouncementModel;
