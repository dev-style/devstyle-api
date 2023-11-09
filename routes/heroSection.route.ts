import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createHeroSection,
  deleteOneHeroSection,
  getAllHeroSections,
  getOneHeroSection,
  updateHeroSectionImage,
  updateOneHeroSection,
} from "../controllers/heroSection.controller";
const heroSectionRoute = express.Router();

heroSectionRoute.post(
  "/hero/create",
  isAutheticated,
  authorizeRoles("admin"),
  createHeroSection
);
heroSectionRoute.get("/hero/all", getAllHeroSections);
heroSectionRoute.get("/hero/:id", getOneHeroSection);
heroSectionRoute.delete(
  "/hero/delete/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteOneHeroSection
);
heroSectionRoute.put(
  "/hero/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateOneHeroSection
);
heroSectionRoute.put(
  "/hero/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateHeroSectionImage
);

export default heroSectionRoute;
