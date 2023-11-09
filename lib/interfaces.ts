require("dotenv").config();
import mongoose from "mongoose";

export interface IAffiliation {
  ambassadorId: mongoose.Schema.Types.ObjectId;
  ambassadorName: string;
  affiliateCode: string;
  clicksCount: number;
}

export interface IAnnouncement {
  text: string;
  link: string;
}

export interface IClient {
  name: string;
  number: number;
  from: string;
}

export interface ICollection {
  title: string;
  slug: string;
  colors: string;
  image: {} | string;
  views: number;
  show: boolean;
}

export interface IGoodie {
  name: string;
  description: string;
  slug: string;
  fromCollection: mongoose.Schema.Types.ObjectId;
  promoPercentage: number;
  price: number;
  inPromo: boolean;
  views: number;
  size: Array<ISize>;
  image:
    | Array<{
        public_id: string;
        url: string;
      }>
    | string[];
  availableColors: Array<string>;
  backgroundColors: Array<string>;
  likes: number;
  show: boolean;
}

export interface IHeroSection {
  text: string;
  image:
    | {
        public_id: string;
        url: string;
      }
    | string;
  show: boolean;
}

export interface INewsletter {
  email: string;
}

export interface IOrder {
  number: number;
  description: string;
  status: string;
  initDate: Date;
  endDate: Date;
}

export interface IPartner {
  name: string;
  logoColor: {} | string;
  logoWhite: {} | string;
  logoBlack: {} | string;
  link: string;
  show: boolean;
}

export interface ISize {
  id: string;
  size: string;
}

export interface ISocial {
  id: number;
  name: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar:
    | {
        public_id: string;
        url: string;
      }
    | string;
  role: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

export interface IAmbassador {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  social: Array<{
    id: number;
    name: string;
    link: string;
  }>;
  colors: string;
  show: boolean;
}
