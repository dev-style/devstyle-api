import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createPartner,
  deleteOnePartner,
  getAllPartners,
  getOnePartner,
  updateOnePartner,
  updatePartnerImage,
} from "../controllers/partner.controller";
const partnerRoute = express.Router();

partnerRoute.post(
  "/partner/create",
  isAutheticated,
  authorizeRoles("admin"),
  createPartner
);
partnerRoute.get("/partner/all", getAllPartners);
partnerRoute.get("/partner/:id", getOnePartner);
partnerRoute.put(
  "/partner/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateOnePartner
);
partnerRoute.put(
  "/partner/delete/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteOnePartner
);
partnerRoute.put(
  "/partner/update/image/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updatePartnerImage
);

export default partnerRoute;
