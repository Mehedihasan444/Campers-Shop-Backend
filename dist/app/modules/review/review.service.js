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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield review_model_1.Review.create(payload)).populate('productId');
    return result;
});
const getAllReviews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ productId: payload.id });
    return result;
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
