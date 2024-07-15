
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: TReview) => {

  const result = (await Review.create(payload)).populate('productId');
  return result;
};

const getAllReviews = async (payload: Record<string, unknown>) => {

  const result = await Review.find({productId:payload.id});
  return result;
};


// get a single Review from the database
const getAReview = async (id: string) => {
  const result = await Review.findById(id);
  return result;
};

// update a Review with a new value
const updateAReview = async (
  id: string,
  updateData: Record<string, unknown>
) => {
  const result = await Review.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a Review from the database
const deleteAReview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};
export const ReviewServices = {
  createReview,
  getAllReviews,
  getAReview,
  updateAReview,
  deleteAReview,
};
