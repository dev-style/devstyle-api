import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  updateAnnouncement
} from "../controllers/announcement.controller";
const annoucementRoute = express.Router();

annoucementRoute.post(
  "/annoucement/create",
  isAutheticated,
  authorizeRoles("admin"),
  createAnnouncement
);

annoucementRoute.get("/annoucement/all", getAllAnnouncement);

annoucementRoute.get(
  "/annoucement/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateAnnouncement
);
annoucementRoute.get(
  "/annoucement/delete/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteAnnouncement
);

export default annoucementRoute;
