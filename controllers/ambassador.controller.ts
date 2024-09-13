require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "../services/user.service";
import cloudinary from "cloudinary";
import { IUser } from "../lib/interfaces";
import AmbassadorModel from "../models/ambassador.model";
import bcrypt from "bcryptjs";
// register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const createAmbassador = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { name, email, password, social, colors, avatar } = req.body;
      social = JSON.parse(social);
      console.log("social2", social);
      console.log("req.body", req.body);

      // console.log("req.file",req.file)
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }

      const user = new userModel({
        name,
        email,
        password,
        role: "ambassador",
        isVerified: true,
      });

      console.log("user", user);

      const ambassador = new AmbassadorModel({
        userId: user._id,
        name,
        social,
        colors,
        image: "newPath",
      });

      await user.save();
      await ambassador.save();

      return res.status(200).json({ ambassador });
    } catch (error: any) {
      console.log("error", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user info
export const getAmbassadorInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all users --- only for admin
export const getAllAmbassadors = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete user --- only for admin
export const deleteAmbaddor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
