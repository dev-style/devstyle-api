import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import AnnouncementModel from "../models/announcement.model";
import ErrorHandler from "../utils/ErrorHandler";

export const createAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const announcement = await AnnouncementModel.create(data);

      res.status(200).json({
        success: true,
        message: announcement
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getAllAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await AnnouncementModel.find();

      res.status(200).json({
        success: true,
        message: announcement
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await AnnouncementModel.findOneAndUpdate({_id:req.params.id} , {...req.body} , {new:true})

      res.status(200).json({
        success: true,
        message: announcement
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const deleteAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const announcement = await AnnouncementModel.deleteOne({_id:req.params.id})

      res.status(200).json({
        success: true,
        message: announcement
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
