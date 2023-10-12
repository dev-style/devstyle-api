import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const newsletterRoute = express.Router();

newsletterRoute.get(
  "/get-all-notifications",
  isAutheticated,
  authorizeRoles("admin"),
);
newsletterRoute.put("/update-notification/:id", isAutheticated, authorizeRoles("admin"), );

export default newsletterRoute;
