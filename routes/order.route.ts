import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/order/create", createOrder);

orderRouter.get(
  "/order/all",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.put(
  "/order/update/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editOrder
);

orderRouter.delete("/order/delete/:id", isAutheticated, deleteOrder);

export default orderRouter;
