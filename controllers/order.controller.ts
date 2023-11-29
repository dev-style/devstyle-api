import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import { IGoodie, IOrder } from "../lib/interfaces";
import GoodieModel from "../models/goodie.model";
import OrderModel from "../models/order.model";
import NotificationModel from "../models/notification.model";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { goodies, name, email, status, initDate } = req.body as IOrder;

      const data = {
        name,
        goodies,
        email,
        status,
        initDate
      };

      console.log(data);

      const mailData = {
        order: {
          _id: Math.random() * 100000000,
          name: name,
          goodies: goodies,
          status: status,
          email: email,
          initDate: new Date().toLocaleDateString("in-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        }
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        await sendMail({
          email: email,
          subject: "Order confirmation",
          template: "order-confirmation.ejs",
          data: mailData
        });
      } catch (error) {
        console.log(error);
      }

      const newOrder = await OrderModel.create(data);

      await NotificationModel.create({
        user: data.name,
        title: "New Order",
        message: `You have a new order from ${goodies[0].name}`
      });

      res.status(200).json({
        newOrder
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get All orders --- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        message: orders
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//  send stripe publishble key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {}
);

// new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete goodie --- only for admin
export const deleteOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const order = await OrderModel.findById(id);

      if (!order) {
        return next(new ErrorHandler("order not found", 404));
      }

      await order.deleteOne({ id });

      // await redis.del(id);

      res.status(200).json({
        message: "order deleted successfully"
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
