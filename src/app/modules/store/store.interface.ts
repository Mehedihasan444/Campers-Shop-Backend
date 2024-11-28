import { Types } from "mongoose";
import { TProduct } from "../product/product.interface";

export type TStore = {
    name: string;
    positiveRating: number;
    shipOnTime: number;
    totalSales: number;
    profilePhoto: string;
    description: string;
    products: TProduct[];
    owner: Types.ObjectId;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}