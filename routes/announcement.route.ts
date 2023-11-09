import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  updateAnnouncement,
  getAnnouncement,
} from "../controllers/announcement.controller";
const announcementRoute = express.Router();

announcementRoute.post(
  "/announcement/create",
  isAutheticated,
  authorizeRoles("admin"),
  createAnnouncement
);

announcementRoute.get("/announcement", getAnnouncement);
announcementRoute.get("/announcement/all", getAllAnnouncement);

announcementRoute.get(
  "/announcement/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateAnnouncement
);
announcementRoute.get(
  "/announcement/delete/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteAnnouncement
);

export default announcementRoute;
