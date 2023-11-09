import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import GoodieModel from "../models/goodie.model";
import { getAllGoodiesService } from "../services/goodie.service";
import CollectionModel from "../models/collection.model";
import { IGoodie } from "../lib/interfaces";

// upload goodie
export const uploadGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IGoodie = req.body;

      // data.availableColors = JSON.parse(req.body.availableColors);
      // data.backgroundColors = JSON.parse(req.body.backgroundColors);
      // data.size = JSON.parse(req.body.size);

      const collection = await CollectionModel.findOne({
        _id: data.fromCollection,
      });
      const collectionSlug = collection?.slug;
      if (!collection) {
        res.status(500).json({
          message: "collection dont exist",
        });
      }

      data.slug = collectionSlug + "-" + data.slug;

      const image = data.image;

      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "DevStyle/Goodies",
        });

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const results = await GoodieModel.create(data);

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit goodie
export const editGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single goodie --- without
export const getSingleGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all goodies --- without
export const getAllGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodies = await GoodieModel.find();

      res.status(200).json({
        message: goodies,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all goodies --- only for admin
export const getAdminAllGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllGoodiesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete goodie --- only for admin
export const deleteGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
