import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import DiscountModel from "../models/discount.model";
import ErrorHandler from "../utils/ErrorHandler";
export const makeDiscount = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req data", req.body);
    const data = req.body?.data;
    console.log("discount value", data);

    try {
      const discount = await DiscountModel.findOne({
        code: data.discountValue,
        goodies: { $in: data.goodieId },
      });
      console.log("discount data", discount);

      if (discount && discount.uses >= discount.limit) {
        await DiscountModel.findByIdAndRemove(discount._id);
        return res.status(40).json({
          message: "Discount has reached its limit and has been removed.",
        });
      } else {
        const updatedDiscount = await DiscountModel.findOneAndUpdate(
          { code: data.discountValue },
          { $inc: { uses: 1 } },
          { new: true }
        );
        console.log("updated discount data", updatedDiscount);

        res.status(200).json({
          message: updatedDiscount,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// i want to fetch my discount and you populate the goodies

export const fetchDiscountByGoodieId = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("res.para", req.params.id);
      const goodieId = req.params.id;
      console.log("goodieId of fetchDiscountByGoodieId ", goodieId);
      const discounts = await DiscountModel.find({
        goodies: { $in: [goodieId] },
      })

        // .populate("goodies")
        .sort({ createdAt: -1 })

        .lean();

      console.log("fetchDiscountByGoodieId:", discounts);

      if (!discounts || discounts.length === 0) {
        console.log("No discount found");
        res.status(200).json({
          message: {},
        });
      }

      res.status(200).json({
        message: discounts,
      });
    } catch (err) {
      console.error("Error fetching discount:", err);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
