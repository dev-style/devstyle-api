import express from "express";
import {
  deleteGoodie,
  editGoodie,
  getAdminAllGoodies,
  getAllGoodies,
  getHotGoodies,
  getNewGoodies,
  getSingleGoodie,
  updateLikes,
  updateViews,
  uploadGoodie
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

goodieRoute.put(
  "/goodie/update/views/:slug",

  updateViews
);

goodieRoute.put(
  "/goodie/update/likes/:slug",

  updateLikes
);

goodieRoute.get("/get-goodie/:id", getSingleGoodie);
goodieRoute.get("/goodies/new-goodies", getNewGoodies);
goodieRoute.get("/goodies/hot-goodies", getHotGoodies);

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
