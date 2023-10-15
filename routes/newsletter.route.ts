import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createAudience,
  deleteOneEmail,
  getAllEmails,
  getOneEmail,
  saveEmail
} from "../controllers/newsletter.controller";
const newsletterRoute = express.Router();

newsletterRoute.post(
  "/newletter/create-list",
  isAutheticated,
  authorizeRoles("admin"),
  createAudience
);
newsletterRoute.get(
  "/newletter/save",
  isAutheticated,
  authorizeRoles("admin"),
  saveEmail
);
newsletterRoute.get(
  "/newletter/all-email",
  isAutheticated,
  authorizeRoles("admin"),
  getAllEmails
);

newsletterRoute.get(
  "/newsletter/:id",
  isAutheticated,
  authorizeRoles("admin"),
  getOneEmail
);

newsletterRoute.get(
  "/newsletter/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteOneEmail
);

export default newsletterRoute;
