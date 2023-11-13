require("dotenv").config();
import mongoose from "mongoose";

export interface IAffiliation extends mongoose.Document {
  ambassadorId: mongoose.Schema.Types.ObjectId;
  ambassadorName: string;
  affiliateCode: string;
  clicksCount: number;
}

export interface IAnnouncement extends mongoose.Document {
  text: string;
  link: string;
}

export interface IClient extends mongoose.Document {
  name: string;
  number: number;
  from: string;
}

export interface ICollection extends mongoose.Document {
  title: string;
  slug: string;
  colors: string;
  image: {};
  views: number;
  show: boolean;
}

export interface IGoodie extends mongoose.Document {
  name: string;
  description: string;
  slug: string;
  fromCollection: mongoose.Schema.Types.ObjectId;
  promoPercentage: number;
  price: number;
  inPromo: boolean;
  views: number;
  size: Array<ISize>;
  images: Array<{
    public_id: string;
    url: string;
  }>;
  availableColors: Array<string>;
  backgroundColors: Array<string>;
  likes: number;
  show: boolean;
}

export interface IHeroSection extends mongoose.Document {
  text: string;
  image: {
    public_id: string;
    url: string;
  };
  show: boolean;
}

export interface INewsletter extends mongoose.Document {
  email: string;
}

export interface IOrder extends mongoose.Document {
  number: number;
  description: string;
  status: string;
  initDate: Date;
  endDate: Date;
}

export interface IPartner extends mongoose.Document {
  name: string;
  logoColor: {};
  logoWhite: {};
  logoBlack: {};
  link: string;
  show: boolean;
}

export interface ISize extends mongoose.Document {
  id: string;
  size: string;
}

export interface ISocial extends mongoose.Document {
  id: number;
  name: string;
}

export interface IUser extends mongoose.Document {
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

export interface IAmbassador extends mongoose.Document {
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

export interface ICloudinaryUploadResponse extends mongoose.Document {
  public_id: string;
  secure_url: string;
}
