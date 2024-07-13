"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        paymentMethod: { type: String, enum: ['stripe', 'cashOnDelivery'], required: true }
    },
    items: [{ id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }, purchasedQuantity: { type: Number, required: true } }],
    paymentDetails: {
        stripePaymentId: { type: String },
        status: { type: String },
        amount: { type: Number },
        currency: { type: String }
    },
    total: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], required: true, default: 'Pending' },
}, {
    timestamps: true
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
