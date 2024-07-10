import { RequestHandler } from "express";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



// create product in the database
const createProduct: RequestHandler=catchAsync( async(req,res)=>{

    const productData= req.body;
    const result = await ProductServices.createProduct(productData)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Product created successfully",
        data:result
    })
})
//get all products
const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProducts(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products are retrieved successfully",
      data: result,
    });
  });

  //get a single product
const getAProduct: RequestHandler = catchAsync(async (req, res) => {
    const result = await ProductServices.getAProduct(req.params.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is retrieved successfully",
      data: result,
    });
  });

  //update a Product
const updateAProduct: RequestHandler =catchAsync( async (req, res) => {
    const ProductId = req.params.id;
    const updateData = req.body;
  
    const result = await ProductServices.updateAProduct( ProductId, updateData );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is updated successfully",
      data: result,
    });
  });
  // delete a Product
  const deleteAProduct: RequestHandler =catchAsync(async (req, res) => {
    const ProductId = req.params.id;
    const result = await ProductServices.deleteAProduct(ProductId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is deleted successfully",
      data: result,
    });
  }) ;
export const ProductControllers={
    createProduct,
    getAllProducts,
    getAProduct,
    deleteAProduct,
    updateAProduct

}