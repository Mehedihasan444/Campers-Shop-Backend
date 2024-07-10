
import mongoose, { Types } from'mongoose'

const wishlistSchema = new mongoose.Schema({
    product:{
    type: Types.ObjectId,
    required: true,
    ref:'Product'
},


})


export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
