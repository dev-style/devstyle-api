import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/order/create", createOrder);

orderRouter.get(
  "/order/all",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAutheticated, newPayment);

orderRouter.delete("/order/delete/:id", isAutheticated, deleteOrder);

export default orderRouter;
