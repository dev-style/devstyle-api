import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import SocialModel from "../models/social.model";

export const createSocial = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const results = await SocialModel.create(data);

      res.status(200).json({
        success: true,
        message: results
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllSocials = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Social = await SocialModel.find();
      res.status(200).json({
        success: true,
        Social
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateOneSocial = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Social = await SocialModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      res.status(200).json({
        success: true,
        Social
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteOneSocial = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Social = await SocialModel.deleteOne({
        _id: req.params.id
      });
      res.status(200).json({
        success: true,
        Social
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
