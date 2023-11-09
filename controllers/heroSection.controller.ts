import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import HeroSectionModel from "../models/heroSection.model";
import { IHeroSection } from "../lib/interfaces";

export const createHeroSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const image = data.image;
      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "DevStyle/HeroSection",
        });

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const results = await HeroSectionModel.create(data);

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getAllHeroSections = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await HeroSectionModel.find({ show: true });

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getOneHeroSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await HeroSectionModel.findOne({ _id: req.params.id });

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateOneHeroSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await HeroSectionModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const deleteOneHeroSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await HeroSectionModel.deleteOne({ _id: req.params.id });

      res.status(201).json({
        message: results,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateHeroSectionImage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { image } = req.body;

      const heroId = req.params.id;

      const myHero = await HeroSectionModel.findById(heroId);

      if (image && myHero) {
        if (myHero?.image?.public_id) {
          await cloudinary.v2.uploader.destroy(myHero.image.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "avatars",
            width: 150,
          });
          myHero.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "avatars",
            width: 150,
          });
          myHero.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await myHero?.save();
      res.status(201).json({
        message: myHero,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
