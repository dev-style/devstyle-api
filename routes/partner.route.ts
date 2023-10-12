import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createPartner, deleteOnePartner, getAllPartners, getOnePartner, updateOnePartner, updatePartnerImage } from "../controllers/partner.controller";
const partnerRoute = express.Router();

partnerRoute.get(
  "/partner/create",
  isAutheticated,
  authorizeRoles("admin"),
  createPartner
  
);
partnerRoute.put("/partner/all", isAutheticated, authorizeRoles("admin"),getAllPartners );
partnerRoute.put("/partner/:id", isAutheticated, authorizeRoles("admin"),getOnePartner );
partnerRoute.put("/partner/update/:id", isAutheticated, authorizeRoles("admin"),updateOnePartner );
partnerRoute.put("/partner/delete/:id", isAutheticated, authorizeRoles("admin"),deleteOnePartner );
partnerRoute.put("/partner/update/image/:id", isAutheticated, authorizeRoles("admin"),updatePartnerImage );

export default partnerRoute;
