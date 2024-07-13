"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield review_model_1.Review.create(payload)).populate('productId');
    return result;
});
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
const getAllReviews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new QueryBuilder instance for the Review query
    const ReviewQuery = new QueryBuilder_1.default(review_model_1.Review.find({}), payload)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate();
    // Execute the query to get the paginated results
    const result = yield ReviewQuery.modelQuery;
    // Create a separate query to count the total number of Reviews matching the filter criteria
    const countQuery = new QueryBuilder_1.default(review_model_1.Review.find({}), payload)
        .search(["name", "description"])
        .filter();
    // Execute the count query to get the total count
    const totalCount = yield countQuery.modelQuery.countDocuments();
    // Return both the paginated results and the total count
    return {
        totalCount,
        Reviews: result,
    };
});
// get a single Review from the database
const getAReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findById(id);
    return result;
});
// update a Review with a new value
const updateAReview = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete a Review from the database
const deleteAReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndDelete(id);
    return result;
});
exports.ReviewServices = {
    createReview,
    getAllReviews,
    getAReview,
    updateAReview,
    deleteAReview,
};
