import { Types } from "mongoose";

export type TReview = {
  productId:Types.ObjectId,
  user_name:string,
  email:string,
    rating: {
      rating: number,
      total_rating: number,
    },
    feedback: string,
    feedback_description:string
    product: {
      image: string,
      name: string,
      product_purchased: number,
    },
  };

