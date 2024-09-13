import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import AffiliationModel from "../models/affiliation.model";
import { IAffiliation } from "../lib/interfaces";
import AmbassadorModel from "../models/ambassador.model";

export const createAffiliation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ambassadorId, ambassadorName } = req.body;
      console.log("ambassadorId,ambassadorName", ambassadorId, ambassadorName);

      let ambassador = await AmbassadorModel.findById(ambassadorId).populate(
        "userId"
      );
      console.log("ambassador", ambassador);

      if (!ambassador)
        return res.status(200).json({ message: "cannot find ambassador" });

      const username = (
        ambassadorName || ambassador.name.toLowerCase()
      ).substring(0, 3);
      console.log("username", username);

      const affiliateCode = `Dsa-${username}-${
        Math.floor(Math.random() * 100) + 100
      }`;

      const expirationTime = 24 * 60 * 60 * 1000; // 1 jour en millisecondes

      // Crée le lien d'affiliation avec la date d'expiration
      const affiliation = new AffiliationModel({
        affiliateCode: affiliateCode,

        ambassador: ambassadorId,
        status: "active",
      });

      await affiliation.save();

      res.status(200).json({ affiliation: affiliation });

      res.status(200).json({
        affiliation,
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
