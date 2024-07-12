import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { OrderServices } from "./order.service";

const createOrder: RequestHandler = catchAsync(async (req, res) => {
    const productData = req.body;
    const result = await OrderServices.createOrder(productData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  });
  export const OrderControllers = {
    createOrder,

  };