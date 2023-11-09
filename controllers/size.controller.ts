import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import SizeModel from "../models/size.model";
import ErrorHandler from "../utils/ErrorHandler";

export const createSize = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const result = await SizeModel.create(data);

      res.status(200).json({
        message: result,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllSizes = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Size = await SizeModel.find();

      res.status(200).json({
        Size,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getOneSize = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Size = SizeModel.findOne({ _id: req.params.id });

      res.status(200).json({
        Size,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateOneSize = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Size = SizeModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      res.status(200).json({
        Size,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteOneSize = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Size = SizeModel.deleteOne({ _id: req.params.id });

      res.status(200).json({
        Size,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
