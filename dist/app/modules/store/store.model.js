"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    positiveRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    shipOnTime: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    totalSales: {
        type: Number,
        default: 0,
        min: 0
    },
    profilePhoto: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        default: []
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: { type: String, required: true },
}, {
    timestamps: true
});
exports.Store = (0, mongoose_1.model)('Store', storeSchema);
