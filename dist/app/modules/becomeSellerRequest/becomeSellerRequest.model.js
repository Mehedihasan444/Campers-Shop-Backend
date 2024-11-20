"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BecomeSellerRequest = void 0;
const mongoose_1 = require("mongoose");
const becomeSellerRequest_interface_1 = require("./becomeSellerRequest.interface");
const becomeSellerRequestSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: becomeSellerRequest_interface_1.becomeSellerRequestStatus.PENDING },
    rejectionReason: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.BecomeSellerRequest = (0, mongoose_1.model)("BecomeSellerRequest", becomeSellerRequestSchema);
