import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createSize, deleteOneSize, getAllSizes, getOneSize, updateOneSize } from "../controllers/size.controller";
const sizeRoute = express.Router();

sizeRoute.post(
  "/size/create",
  isAutheticated,
  authorizeRoles("admin"),
  createSize
);
sizeRoute.get("/size/all", isAutheticated, authorizeRoles("admin"), getAllSizes );
sizeRoute.get("/size/:id", isAutheticated, authorizeRoles("admin"), getOneSize );
sizeRoute.get("/size/update/:id", isAutheticated, authorizeRoles("admin"), updateOneSize );
sizeRoute.get("/size/delete/:id", isAutheticated, authorizeRoles("admin"), deleteOneSize );

export default sizeRoute;
