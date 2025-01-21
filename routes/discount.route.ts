import express from "express";
import { makeDiscount } from "../controllers/discount.controller";
const discountRouter = express.Router();

discountRouter.post("/discount", makeDiscount);
export default discountRouter;
