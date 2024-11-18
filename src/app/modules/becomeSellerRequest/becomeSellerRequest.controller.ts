import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { becomeSellerRequestService } from "./becomeSellerRequest.service";

const createBecomeSellerRequest = catchAsync(async (req, res) => {
  const result = await becomeSellerRequestService.createBecomeSellerRequest(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest created successfully",
    data: result,
  });
});
const getAllBecomeSellerRequestsFromDB = catchAsync(async (req, res) => {
  const result =
    await becomeSellerRequestService.getAllBecomeSellerRequestsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest are retrieved successfully",
    data: result,
  });
});
const getSingleBecomeSellerRequestFromDB = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const result =
    await becomeSellerRequestService.getSingleBecomeSellerRequestFromDB(
      requestId
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest is retrieved successfully",
    data: result,
  });
});
const deleteBecomeSellerRequestFromDB = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const result =
    await becomeSellerRequestService.deleteBecomeSellerRequestFromDB(requestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest is deleted successfully",
    data: result,
  });
});
const updateBecomeSellerRequest = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const becomeSellerRequest = req.body;
  const user = req.user;
  const result = await becomeSellerRequestService.updateBecomeSellerRequest(
    requestId,
    becomeSellerRequest,
   user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest is updated successfully",
    data: result,
  });
});
const cancelBecomeSellerRequest = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const result = await becomeSellerRequestService.cancelBecomeSellerRequest(
    requestId,

  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BecomeSellerRequest is canceled successfully",
    data: result,
  });
});

export const becomeSellerRequestController = {
  createBecomeSellerRequest,
  getAllBecomeSellerRequestsFromDB,
  getSingleBecomeSellerRequestFromDB,
  deleteBecomeSellerRequestFromDB,
  updateBecomeSellerRequest,
  cancelBecomeSellerRequest
};
