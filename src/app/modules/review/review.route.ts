import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewControllers } from "./review.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(ReviewValidation.reviewValidationSchema),
  ReviewControllers.createReview
);
router.get("/:id", ReviewControllers.getAllReviews);
router.get("/:id", ReviewControllers.getAReview);
router.put(
  "/:id",
  validateRequest(ReviewValidation.updateReviewValidationSchema),
  ReviewControllers.updateAReview
);
router.delete("/:id", ReviewControllers.deleteAReview);

export const ReviewRoutes = router;
