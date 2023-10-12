import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createCollection,
  deleteOneCollection,
  getAllCollections,
  getOneCollection,
  getOneCollectionAndGoodies,
  updateOneCollection
} from "../controllers/collection.controller";
const collectionRoute = express.Router();

collectionRoute.post(
  "/collection/create",
  isAutheticated,
  authorizeRoles("admin"),
  createCollection
);
collectionRoute.get(
  "/collection/all",
  getAllCollections
);
collectionRoute.get(
  "/collection/:id",
  getOneCollection
);
collectionRoute.get(
  "/collection/goodies/:slug",
  getOneCollectionAndGoodies
);
collectionRoute.put(
  "/collection/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  updateOneCollection
);
collectionRoute.delete(
  "/collection/delete/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteOneCollection
);

export default collectionRoute;
