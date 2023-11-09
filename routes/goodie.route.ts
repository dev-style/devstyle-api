import express from "express";
import {
  deleteGoodie,
  editGoodie,
  getAdminAllGoodies,
  getAllGoodies,
  getSingleGoodie,
  uploadGoodie,
} from "../controllers/goodie.controller";

import { authorizeRoles, isAutheticated } from "../middleware/auth";
const goodieRoute = express.Router();

goodieRoute.post(
  "/goodie/create",
  isAutheticated,
  authorizeRoles("admin"),
  uploadGoodie
);

goodieRoute.put(
  "/goodie/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editGoodie
);

goodieRoute.get("/get-goodie/:id", getSingleGoodie);

goodieRoute.get("/get-goodie", getAllGoodies);

goodieRoute.get(
  "/get-admin-goodie",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllGoodies
);

goodieRoute.delete(
  "/delete-goodie/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteGoodie
);

export default goodieRoute;
