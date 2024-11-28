import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { storeServices } from "./store.service";

const createStore: RequestHandler = catchAsync(async (req, res) => {
    const storeData = req.body;
    const result = await storeServices.createStore(storeData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Store created successfully",
      data: result,
    });
  });

  const updateStore: RequestHandler = catchAsync(async (req, res) => {
    const storeId = req.params.storeId;
    const storeData = req.body;
    const result = await storeServices.updateStore(storeId, storeData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Store updated successfully",
      data: result,
    });
  });

  const getStoresFromDB: RequestHandler = catchAsync(async (req, res) => {

    const result = await storeServices.getStoresFromDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Stores fetched successfully",
      data: result,
    });
  })

const getStoreFromDB: RequestHandler = catchAsync(async (req, res) => {
    const storeId = req.params.storeId;
    const result = await storeServices.getStoreFromDB(storeId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Store fetched successfully",
      data: result,
    });
  
})

const deleteStoreFromDB: RequestHandler = catchAsync(async (req, res) => {
    const storeId = req.params.storeId;
    const result = await storeServices.deleteStoreFromDB(storeId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Store deleted successfully",
      data: result,
    });
})

  export const StoreControllers = {
    createStore,
    updateStore,
    getStoresFromDB,
    getStoreFromDB,
    deleteStoreFromDB
  };