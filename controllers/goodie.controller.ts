import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinaryUpload from "../cloudinary_config";
import GoodieModel from "../models/goodie.model";
import { getAllGoodiesService } from "../services/goodie.service";
import CollectionModel from "../models/collection.model";
import mongoose from "mongoose";
import { ICloudinaryUploadResponse, IGoodie } from "../lib/interfaces";
const cloudinary = require("../cloudinary_config");

// upload goodie
export const uploadGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IGoodie = req.body;

      const collection = await CollectionModel.findOne({
        _id: data.fromCollection
      });
      const collectionSlug = collection?.slug;
      if (!collection) {
        res.status(500).json({
          message: "collection dont exist"
        });
      }

      data.slug = collectionSlug + "-" + data.slug;

      const images = data.images;
      if (images) {
        console.log("les image existe :", images);
        const uploadedImages = [];
        for (const image of images) {
          const myCloud: ICloudinaryUploadResponse = (await uploader(
            image
          )) as ICloudinaryUploadResponse;

          uploadedImages.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          });
        }
        data.images = uploadedImages;
      }

      const results = await GoodieModel.create(data);

      res.status(201).json({
        success: true,
        message: data
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

const uploader = async (path: any) =>
  await cloudinaryUpload(path, `DevStyle/Goodies`, {
    transformation: [
      {
        overlay: "devstyle_watermark",
        opacity: 10,
        gravity: "north_west",
        x: 5,
        y: 5,
        width: "0.5"
      },
      {
        overlay: "devstyle_watermark",
        opacity: 6.5,
        gravity: "center",
        width: "1.0",
        angle: 45
      },
      {
        overlay: "devstyle_watermark",
        opacity: 10,
        gravity: "south_east",
        x: 5,
        y: 5,
        width: "0.5"
      }
    ]
  });

// edit goodie
export const editGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const images = data.images;
      const goodieId = req.params.id;

      console.log("le id", goodieId);

      const goodieData = await GoodieModel.findById({ _id: goodieId });

      console.log("voici les goodie a update", goodieData);

      if (images && images[0] instanceof String ) {
        console.log("les image existe :", images);
        const uploadedImages = [];
        for (const image of images) {
          const myCloud: ICloudinaryUploadResponse = (await uploader(
            image
          )) as ICloudinaryUploadResponse;

          uploadedImages.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url
          });
        }
        data.images = uploadedImages;
      }

      const goodie = await GoodieModel.findByIdAndUpdate(
        goodieId,
        { $set: data },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: goodie
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single goodie --- without
export const getSingleGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodie = await GoodieModel.findOne({ slug: req.params.slug })
        .populate("fromCollection")
        .populate("size");

      res.status(200).json({
        message: goodie
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all goodies --- without
export const getAllGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodies = await GoodieModel.find({ show: true });
      console.log(" les goodies", goodies);

      res.status(201).json({
        success: true,
        message: goodies
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
      const { id } = req.params;

      const goodie = await GoodieModel.findById(id);

      if (!goodie) {
        return next(new ErrorHandler("goodie not found", 404));
      }

      await goodie.deleteOne({ id });

      // await redis.del(id);

      res.status(200).json({
        success: true,
        message: "goodie deleted successfully"
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update Likes

export const updateLikes = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodie = await GoodieModel.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { likes: 1 } },
        { new: true }
      );

      res.status(200).json({
        message: goodie
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update Views

export const updateViews = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodie = await GoodieModel.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { views: 1 } },
        { new: true }
      );

      res.status(200).json({
        message: goodie
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get new goodies

export const getNewGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skipCount = parseInt(req.headers.skip as string, 10);
      const goodies = await GoodieModel.find({ show: true })
        .skip(skipCount)
        .limit(4)
        .sort({ createdAt: -1 });

      res.status(200).json({
        message: goodies
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get hot goodies

export const getHotGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skipCount = parseInt(req.headers.skip as string, 10);

      const goodies = await GoodieModel.find({ show: true })
        .skip(skipCount)
        .sort({ views: -1, likes: -1 })
        .limit(8);

      res.status(200).json({
        message: goodies
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get hot goodies of a collection

export const getHotGoodiesOfCollection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skipCount = parseInt(req.headers.skip as string, 10);

      const goodies = await GoodieModel.aggregate([
        {
          $match: {
            fromCollection: new mongoose.Types.ObjectId(
              req.params.collectionID
            ),
            show: true,
            _id: { $ne: new mongoose.Types.ObjectId(req.params.goodieID) }
          }
        },
        { $sample: { size: 4 } }
      ]);

      res.status(200).json({
        message: goodies
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
