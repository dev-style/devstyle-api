require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import goodieRoute from "./routes/goodie.route";
import orderRouter from "./routes/order.route";
import analyticsRouter from "./routes/analytics.route";
import { rateLimit } from "express-rate-limit";
import collectionRoute from "./routes/collection.route";
import heroSectionRoute from "./routes/heroSection.route";
import partnerRoute from "./routes/partner.route";
import sizeRoute from "./routes/size.route";
import socialRoute from "./routes/social.route";
import affiliationRoute from "./routes/affiliation.route";
import newsletterRoute from "./routes/newsletter.route";
import announcementRoute from "./routes/announcement.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

/*****cors error protection and data parsing*****/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://dev-style.com"],
    credentials: true
  })
);

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

// routes
app.use(
  "/api/v1",
  userRouter,
  announcementRoute,
  orderRouter,
  goodieRoute,
  collectionRoute,
  heroSectionRoute,
  partnerRoute,
  sizeRoute,
  socialRoute,
  affiliationRoute,
  newsletterRoute,

  analyticsRouter
);

// testing api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to the otherside🙂"
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);

export default () => connectDB().then(() => app);
