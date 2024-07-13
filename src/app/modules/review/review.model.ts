

import  { model, Schema } from'mongoose'
import { TReview } from './review.interface';
const reviewSchema = new Schema<TReview>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  rating: {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    total_rating: {
      type: Number,
      required: true
    }
  },
  feedback: {
    type: String,
    required: true
  },
  feedback_description: {
    type: String,
    required: true
  },
  product: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    product_purchased: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});


export const Review = model<TReview>('Review', reviewSchema);

