import { Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import GoodieModel from "../models/goodie.model";

// create goodie
export const createGoodie = CatchAsyncError(
  async (data: any, res: Response) => {
    const goodie = await GoodieModel.create(data);
    res.status(201).json({
      message: goodie,
    });
  }
);

// Get All goodies
export const getAllGoodiesService = async (res: Response) => {
  const goodies = await GoodieModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    message: goodies,
  });
};
