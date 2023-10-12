import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createSocial, deleteOneSocial, getAllSocials, updateOneSocial } from "../controllers/social.controller";
const socialRoute = express.Router();

socialRoute.post(
  "/social/create",
  isAutheticated,
  createSocial
  
);
socialRoute.get("/social/all", isAutheticated,getAllSocials );
socialRoute.get("/social/update/:id", isAutheticated,updateOneSocial );
socialRoute.get("/social/delete/:id", isAutheticated,deleteOneSocial );
socialRoute.get("/all", isAutheticated,getAllSocials );

export default socialRoute;
