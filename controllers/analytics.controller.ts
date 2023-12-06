import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import userModel from "../models/user.model";
import OrderModel from "../models/social.model";
import { generateLast12MothsData } from "../utils/analytics.generator";

// get users analytics --- only for admin
export const getUsersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get courses analytics --- only for admin
export const getGoodiesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get order analytics --- only for admin
export const getOrderAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MothsData(OrderModel);
      res.status(200).json({
        message: orders
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
