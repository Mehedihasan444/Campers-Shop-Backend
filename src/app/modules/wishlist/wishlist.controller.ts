import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { WishlistServices } from "./wishlist.service";

const createWishlistProduct: RequestHandler = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await WishlistServices.createWishlistProduct(productData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added successfully in the wishlist",
    data: result,
  });
});

const getWishlistProducts: RequestHandler = catchAsync(async (req, res) => {
  const result = await WishlistServices.getWishlistProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "wishlist Products are retrieved successfully",
    data: result,
  });
});
const deleteWishlistProduct: RequestHandler = catchAsync(async (req, res) => {
  const ProductId = req.params.id;
  const result = await WishlistServices.deleteWishlistProduct(ProductId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist Product is deleted successfully",
    data: result,
  });
});

export const WishlistControllers = {
  createWishlistProduct,
  getWishlistProducts,
  deleteWishlistProduct,
};
