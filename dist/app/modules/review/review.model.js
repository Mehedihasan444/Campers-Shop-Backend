"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
