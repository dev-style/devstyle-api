import express from "express";
import {  fetchDiscountByGoodieId, makeDiscount } from "../controllers/discount.controller";
const discountRouter = express.Router();

discountRouter.post("/discount", makeDiscount);
discountRouter.get("/discount/:id",fetchDiscountByGoodieId)
export default discountRouter;
