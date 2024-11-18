import { User } from "../User/user.model";
import {
  becomeSellerRequestStatus,
  TBecomeSellerRequest,
} from "./becomeSellerRequest.interface";
import { BecomeSellerRequest } from "./becomeSellerRequest.model";
import { Store } from "../shop/store.model";
import { USER_ROLE } from "../User/user.constant";
import mongoose, { Error } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createBecomeSellerRequest = async (
  becomeSellerRequest: TBecomeSellerRequest
) => {
  const result = await BecomeSellerRequest.create(becomeSellerRequest);
  return result;
};
const getAllBecomeSellerRequestsFromDB = async () => {
  const result = await BecomeSellerRequest.find();
  return result;
};
const getSingleBecomeSellerRequestFromDB = async (requestId: string) => {
  const result = await BecomeSellerRequest.findById(requestId);
  return result;
};
const deleteBecomeSellerRequestFromDB = async (requestId: string) => {
  const result = await BecomeSellerRequest.findByIdAndDelete(requestId);
  return result;
};
const cancelBecomeSellerRequest = async (requestId: string) => {
  const result = await BecomeSellerRequest.findByIdAndUpdate(
    requestId,
    {
      $set: {
        status: becomeSellerRequestStatus.CANCELED,
      },
    },
    { new: true }
  );
  return result;
};
const updateBecomeSellerRequest = async (
  requestId: string,
  becomeSellerRequest: Partial<TBecomeSellerRequest>,
  user: JwtPayload
) => {
  const session = await mongoose.startSession();
  try {
    let result;
    if (becomeSellerRequest.status === "APPROVED") {
      result = await BecomeSellerRequest.findByIdAndUpdate(
        requestId,
        {
          $set: {
            status: becomeSellerRequest.status,
            rejectionReason: becomeSellerRequest.rejectionReason,
          },
        },
        { new: true }
      );
      const getUser = await User.findOne({ email: user.email });
      if (!getUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }
      const StoreData = {
        name: becomeSellerRequest.name + "'s Store",
        owner: getUser?._id,
        location: becomeSellerRequest.address,
        description: "This is the store of " + becomeSellerRequest.name,
      };

      await Store.create([StoreData], { session: session });

      await User.findByIdAndUpdate(
        user?._id,
        { $set: { role: USER_ROLE.SELLER } },
        { new: true, session: session }
      );

      await session.commitTransaction();
      await session.endSession();
    } else if (becomeSellerRequest.status === "REJECTED") {
      result = await BecomeSellerRequest.findByIdAndUpdate(
        requestId,
        {
          $set: {
            status: becomeSellerRequest.status,
            rejectionReason: becomeSellerRequest.rejectionReason,
          },
        },
        { new: true }
      );
    }
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error((error as Error).message);
  }
};

export const becomeSellerRequestService = {
  createBecomeSellerRequest,
  getAllBecomeSellerRequestsFromDB,
  getSingleBecomeSellerRequestFromDB,
  deleteBecomeSellerRequestFromDB,
  updateBecomeSellerRequest,
  cancelBecomeSellerRequest,
};
