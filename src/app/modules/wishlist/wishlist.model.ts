import{ model, Schema } from "mongoose";
import { TWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<TWishlist>({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
},{
    timestamps: true,
  
});

export const Wishlist = model<TWishlist>("Wishlist", wishlistSchema);
