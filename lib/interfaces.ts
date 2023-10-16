require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAffiliation extends Document {
  ambassadorId: mongoose.Schema.Types.ObjectId;
  affiliateCode: string;
  affiliateLink: string;
  clicksCount: number;
  createdAt: Date;
}

export interface IAnnouncement extends Document {
  text: string;
  link: string;
}

export interface IClient extends Document {
  name: string;
  number: number;
  from: string;
}

export interface ICollection extends Document {
  title: string;
  slug: string;
  colors: string;
  image: {};
  views: number;
  show: boolean;
}

export interface IGoodie extends Document {
  name: string;
  description: string;
  slug: string;
  fromCollection: mongoose.Schema.Types.ObjectId;
  promoPercentage: number;
  price: number;
  inPromo: boolean;
  views: number;
  size: Array<ISize>;
  image: Array<{
    public_id: string;
    url: string;
  }>;
  availableColors: Array<string>;
  backgroundColors: Array<string>;
  likes: number;
  show: boolean;
}

export interface IHeroSection extends Document {
  text: string;
  image: {
    public_id: string;
    url: string;
  };
  show: boolean;
}

export interface INewsletter extends Document {
  email: string;
}

export interface IOrder extends Document {
  number: number;
  description: string;
  status: string;
  initDate: Date;
  endDate: Date;
}

export interface IPartner extends Document {
  name: string;
  logoColor: {};
  logoWhite: {};
  logoBlack: {};
  link: string;
  show: boolean;
}

export interface ISize extends Document {
  id: string;
  size: string;
}

export interface ISocial extends Document {
  id: number;
  name: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}


export interface IAmbassador extends Document {
  name: string;
  image: {};
  social: Array<{
    id: number;
    name: string;
    link: string;
  }>;
  colors: string;
  show: boolean;
}
