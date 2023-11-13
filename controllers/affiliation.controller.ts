import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import AffiliationModel from "../models/affiliation.model";
import { IAffiliation } from "../lib/interfaces";

export const createAffiliation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ambassadorId, ambassadorName } = req.body;

      let affiliateCode = "";
      let isUsed = true;

      while (isUsed) {
        affiliateCode = Math.random()
          .toString(36)
          .slice(2, 7)
          .toLocaleUpperCase();

        const affiliate = await AffiliationModel.findOne({
          affiliateCode,
        });

        if (!affiliate?._id) {
          isUsed = false;
        }
      }

      const data = {
        affiliateCode,
        ambassadorId,
        ambassadorName,
        clicksCount: 0,
      };

      const newAffiliation = await AffiliationModel.create(data);

      res.status(200).json({
        newAffiliation,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateClickCount = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { affiliateCode } = req.params;
      const affiliate = await AffiliationModel.findOneAndUpdate(
        {
          affiliateCode,
        },
        {
          $inc: { clicksCount: 1 },
        },
        { new: true }
      );

      if (!affiliate?._id) {
        return res.status(404).json({ error: "Affiliate code not found" });
      }
      return res.status(200).json({ clickCount: affiliate.clicksCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
