import { NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import DiscountModel from "../models/discount.model";
import ErrorHandler from "../utils/ErrorHandler";
export const makeDiscount = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req data", req.body);
    const discountValue = req.body?.discount;
    console.log("discount value", discountValue);

    try {
      const discount = await DiscountModel.findOne({ code: discountValue });
      console.log("discount data", discount);

      if (discount && discount.uses >= discount.limit) {
        await DiscountModel.findByIdAndRemove(discount._id);
        return res.status(40).json({
          message: "Discount has reached its limit and has been removed.",
        });
      } else {
        const updatedDiscount = await DiscountModel.findOneAndUpdate(
          { code: discountValue },
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
