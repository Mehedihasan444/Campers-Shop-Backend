import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";

// create Category in the database
const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const CategoryImage = req.files;
  const CategoryData = req.body;
  req.body.image = Array.isArray(CategoryImage)
    ? CategoryImage[0].path
    : CategoryImage?.categoryImage[0].path;
  const result = await CategoryServices.createCategory(CategoryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
//get all Category
const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategory(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories are retrieved successfully",
    data: result,
  });
});

//get a single Category
const getACategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getACategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is retrieved successfully",
    data: result,
  });
});

//update a Category
const updateACategory: RequestHandler = catchAsync(async (req, res) => {
  if (req.files) {
    req.body.image = Array.isArray(req.files) ? req.files[0].path : req.files?.categoryImage[0].path as string;
  }
  const CategoryId = req.params.id;
  const updateData = req.body;


  const result = await CategoryServices.updateACategory(CategoryId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is updated successfully",
    data: result,
  });
});
// delete a Category
const deleteACategory: RequestHandler = catchAsync(async (req, res) => {
  const CategoryId = req.params.id;
  const result = await CategoryServices.deleteACategory(CategoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is deleted successfully",
    data: result,
  });
});
export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getACategory,
  deleteACategory,
  updateACategory,
};
