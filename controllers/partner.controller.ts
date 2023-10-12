import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import PartnerModel from "../models/partner.model";

export const createPartner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const urls = [];
      const { name, link } = req.body;

      for (const file of req.body.files) {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
        urls.push(result.secure_url);
      }

      if (urls.length == 0) {
        return res.status(500).json({ message: "sorry an error occur" });
      }

      const partner = {
        name,
        link,
        logoColor: urls[0] ?? "",
        logoWhite: urls[1] ?? "",
        logoBlack: urls[2] ?? ""
      };

      const myPartner = await PartnerModel.create(partner);
      res.status(200).json({
        success: true,
        myPartner
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllPartners = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partners = await PartnerModel.find();

      res.status(200).json({
        success: true,
        partners
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getOnePartner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partners = await PartnerModel.findById(req.params.id);

      res.status(200).json({
        success: true,
        partners
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateOnePartner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partners = await PartnerModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      res.status(200).json({
        success: true,
        partners
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const deleteOnePartner = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const partners = await PartnerModel.deleteOne({ id });

      res.status(200).json({
        success: true,
        partners
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


export const updatePartnerImage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const partners = await PartnerModel.deleteOne({ id });

      res.status(200).json({
        success: true,
        partners
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
