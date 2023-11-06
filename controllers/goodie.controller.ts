import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/size.model";
import axios from "axios";
import GoodieModel from "../models/goodie.model";
import { createGoodie, getAllGoodiesService } from "../services/goodie.service";
import CollectionModel from "../models/collection.model";
const cloudinary = require("../cloudinary_config");

// upload goodie
export const uploadGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      // data.availableColors = JSON.parse(req.body.availableColors);
      // data.backgroundColors = JSON.parse(req.body.backgroundColors);
      // data.size = JSON.parse(req.body.size);

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

      const image = data.image;

      if (image) {
        const myCloud = await uploader(image);

        data.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url
        };
      }

      const results = await GoodieModel.create(data);

      res.status(201).json({
        success: true,
        message: results
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

const uploader = async (path: any) =>
  await cloudinary.uploads(path, `DevStyle/Goodies`, {
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
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single goodie --- without purchasing
export const getSingleGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all goodies --- without purchasing
export const getAllGoodies = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodies = await GoodieModel.find();

      res.status(200).json({
        success: true,
        goodies
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

// Delete Course --- only for admin
export const deleteGoodie = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
