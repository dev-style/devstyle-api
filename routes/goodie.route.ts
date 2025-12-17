import express from "express";
import {
  deleteGoodie,
  editGoodie,
  getAdminAllGoodies,
  getAllGoodies,
  getHotGoodies,
  getHotGoodiesOfCollection,
  getNewGoodies,
  getSingleGoodie,
  updateLikes,
  updateViews,
  uploadGoodie,
  getSearchAllGoodies,
  resetGoodies,
  applyCollectionDiscount,
} from "../controllers/goodie.controller";

import { authorizeRoles, isAutheticated } from "../middleware/auth";
const goodieRoute = express.Router();

goodieRoute.post(
  "/goodie/create",
  isAutheticated,
  authorizeRoles("admin"),
  uploadGoodie,
);

goodieRoute.put(
  "/goodie/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editGoodie,
);

goodieRoute.put("/goodie/update/views/:slug", updateViews);

goodieRoute.put("/goodie/update/likes/:slug", updateLikes);

goodieRoute.get("/goodie/all", getAllGoodies);
goodieRoute.get("/goodie/search/all", getSearchAllGoodies);

goodieRoute.get("/goodie/:slug", getSingleGoodie);

goodieRoute.get("/goodies/new-goodies", getNewGoodies);
goodieRoute.get("/goodies/hot-goodies", getHotGoodies);
goodieRoute.get(
  "/goodies/hot-goodies/collection/:collectionID/:goodieID",
  getHotGoodiesOfCollection,
);

goodieRoute.get(
  "/get-admin-goodie",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllGoodies,
);

goodieRoute.delete(
  "/delete-goodie/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteGoodie,
);
goodieRoute.get(
  "/reset-goodies",
  resetGoodies,
);
goodieRoute.get(
  "/apply-discount-to-collection/:collectionID/:discountPercentage",
  // isAutheticated,
  // authorizeRoles("admin"),
  applyCollectionDiscount,
);

export default goodieRoute;
