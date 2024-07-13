import QueryBuilder from "../../builder/QueryBuilder";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: TReview) => {

  const result = (await Review.create(payload)).populate('productId');
  return result;
};
// get all Review from the database
// const getAllReviews = async (payload: Record<string, unknown>) => {
//   const ReviewQuery = new QueryBuilder(Review.find({}), payload)
//   .search(["name", "description"])
//     .filter()
//     .sort()
//     .paginate()

//   const result = await ReviewQuery.modelQuery;
 
//   return result;
// };
const getAllReviews = async (payload: Record<string, unknown>) => {
  // Create a new QueryBuilder instance for the Review query
  const ReviewQuery = new QueryBuilder(Review.find({}), payload)
    .search(["name", "description"])
    .filter()
    .sort()
    .paginate();

  // Execute the query to get the paginated results
  const result = await ReviewQuery.modelQuery;

  // Create a separate query to count the total number of Reviews matching the filter criteria
  const countQuery = new QueryBuilder(Review.find({}), payload)
    .search(["name", "description"])
    .filter();

  // Execute the count query to get the total count
  const totalCount = await countQuery.modelQuery.countDocuments();

  // Return both the paginated results and the total count
  return {
    totalCount,
    Reviews: result,
  };
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
