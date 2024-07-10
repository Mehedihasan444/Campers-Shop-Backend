

import mongoose from'mongoose'

const productSchema = new mongoose.Schema({
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
//   id: {
//     type: String,
//     required: true,
//     unique: true
//   },
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
  isBestseller: {
    type: Boolean,
    required: true,
    default: false
  },
  // isNew: {
  //   type: Boolean,
  //   required: true,
  //   default: true
  // },
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

export const Product = mongoose.model('Product', productSchema);

