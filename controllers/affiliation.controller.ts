import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import AffiliationModel from "../models/affiliation.model";

export const createAffiliation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { AmbassadorId } = req.body;

      const affiliateCode = Math.random().toString(36).substring(2);

      const affiliateLink = `$dev-style.com/affiliate/${affiliateCode}`;

      const data = {
        affiliateCode,
        affiliateLink
      };

      const newAffiliation = await AffiliationModel.create(data);

      res.status(200).json({
        success: true,
        newAffiliation
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
      const affiliateLink = await AffiliationModel.findOneAndUpdate(
        {
          affiliateCode
        },
        {
          $inc: { clicksCount: 1 }
        },
        { new: true }
      );

      if (!affiliateLink) {
        return res.status(404).json({ error: "Affiliate Link not found" });
      }
      return res
        .status(200)
        .json({ success: true, clickCount: affiliateLink.clicksCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
