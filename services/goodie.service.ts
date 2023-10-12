import { Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import GoodieModel from "../models/goodie.model";

// create course
export const createGoodie = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await GoodieModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})

// Get All Courses
export const getAllGoodiesService = async (res: Response) => {
    const courses = await GoodieModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      courses,
    });
  };
  