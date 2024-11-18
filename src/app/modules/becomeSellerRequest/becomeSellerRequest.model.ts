import { model, Schema } from "mongoose";
import {
  becomeSellerRequestStatus,
  TBecomeSellerRequest,
} from "./becomeSellerRequest.interface";

const becomeSellerRequestSchema = new Schema<TBecomeSellerRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: becomeSellerRequestStatus.PENDING },
    rejectionReason: { type: String , default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const BecomeSellerRequest = model<TBecomeSellerRequest>(
  "BecomeSellerRequest",
  becomeSellerRequestSchema
);
