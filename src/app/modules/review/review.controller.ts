import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ReviewServices } from "./review.service";



// create Review in the database
const createReview: RequestHandler=catchAsync( async(req,res)=>{

    const ReviewData= req.body;

    const result = await ReviewServices.createReview(ReviewData)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Review created successfully",
        data:result
    })
})
//get all Reviews
const getAllReviews: RequestHandler = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAllReviews(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reviews are retrieved successfully",
      data: result,
    });
  });

  //get a single Review
const getAReview: RequestHandler = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAReview(req.params.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review is retrieved successfully",
      data: result,
    });
  });

  //update a Review
const updateAReview: RequestHandler =catchAsync( async (req, res) => {
    const ReviewId = req.params.id;
    const updateData = req.body;
  
    const result = await ReviewServices.updateAReview( ReviewId, updateData );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review is updated successfully",
      data: result,
    });
  });
  // delete a Review
  const deleteAReview: RequestHandler =catchAsync(async (req, res) => {
    const ReviewId = req.params.id;
    const result = await ReviewServices.deleteAReview(ReviewId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review is deleted successfully",
      data: result,
    });
  }) ;
export const ReviewControllers={
    createReview,
    getAllReviews,
    getAReview,
    deleteAReview,
    updateAReview

}