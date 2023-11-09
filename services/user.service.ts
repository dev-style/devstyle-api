import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";
import { MongoClient } from "mongodb";
import AmbassadorModel from "../models/ambassador.model";
import AffiliationModel from "../models/affiliation.model";

// get user by id

const dbUrl: string = process.env.DB_URL || "";

const client = new MongoClient(dbUrl);
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      user,
    });
  }
};

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string,
  social: Array<{
    id: number;
    name: string;
    link: string;
  }>,
  colors: string
) => {
  const user = await userModel.findOne({ _id: id });

  const session = client.startSession();
  if (role == "ambassador") {
    try {
      await session.withTransaction(async () => {
        const ambassador = await AmbassadorModel.create({
          userId: id,
          name: user?.name,
          social: social,
          colors: colors,
        });

        const affiliateCode = Math.random().toString(36).substring(2);

        console.log("Voici le code d'affiliation : ", affiliateCode);

        const affiliation = await AffiliationModel.create({
          ambassadorId: id,
          ambassadorName: user?.name,
          affiliateCode: affiliateCode,
          clicksCount: 0,
        });

        const users = await userModel.findByIdAndUpdate(
          id,
          { role },
          { new: true }
        );
      });
    } finally {
      await session.endSession();
      await client.close();
    }
  } else {
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  res.status(201).json({
    message: {
      "user update": user,
      // "affiliation create":affiliat
    },
  });
};
