

import  { model, Schema } from'mongoose'
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  brand: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true
  },
  isFeatured: {
    type: Boolean,
    required: true,
    default: false
  },
  reviews: {
    type: Number,
    required: true,
    default: 0
  },
  isBestseller: {
    type: Boolean,
    required: true,
    default: false
  },
  isPopular: {
    type: Boolean,
    required: true,
    default: false
  },
  isSoldOut: {
    type: Boolean,
    required: true,
    default: false
  },
  isDiscounted: {
    type: Boolean,
    required: true,
    default: false
  },
  isOutofstock: {
    type: Boolean,
    required: true,
    default: false
  },
  isComingSoon: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
});

export const Product = model<TProduct>('Product', productSchema);

