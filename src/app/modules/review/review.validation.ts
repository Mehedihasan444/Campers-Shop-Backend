import { z } from "zod";

// Validation schema for creating a review
const reviewValidationSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .min(1, { message: "Product ID is required and must not be empty" }),
    rating: z.object({
      rating: z
        .number()
        .min(0, { message: "Rating must be at least 0" })
        .max(5, { message: "Rating must be at most 5" }),
      total_rating: z
        .number()
        .nonnegative({ message: "Total rating must be a non-negative number" }),
    }),
    feedback: z
      .string()
      .min(1, { message: "Feedback is required and must not be empty" }),
    feedback_description: z
      .string()
      .min(1, {
        message: "Feedback description is required and must not be empty",
      }),
    product: z.object({
      image: z.string().url({ message: "Image must be a valid URL" }),
      name: z
        .string()
        .min(1, { message: "Product name is required and must not be empty" }),
      product_purchased: z
        .number()
        .nonnegative({
          message: "Product purchased must be a non-negative number",
        }),
    }),
  }),
});

// Validation schema for updating a review
const updateReviewValidationSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .min(1, { message: "Product ID must not be empty" })
      .optional(),
    rating: z
      .object({
        rating: z
          .number()
          .min(0, { message: "Rating must be at least 0" })
          .max(5, { message: "Rating must be at most 5" })
          .optional(),
        total_rating: z
          .number()
          .nonnegative({
            message: "Total rating must be a non-negative number",
          })
          .optional(),
      })
      .optional(),
    feedback: z
      .string()
      .min(1, { message: "Feedback must not be empty" })
      .optional(),
    feedback_description: z
      .string()
      .min(1, { message: "Feedback description must not be empty" })
      .optional(),
    product: z
      .object({
        image: z
          .string()
          .url({ message: "Image must be a valid URL" })
          .optional(),
        name: z
          .string()
          .min(1, { message: "Product name must not be empty" })
          .optional(),
        product_purchased: z
          .number()
          .nonnegative({
            message: "Product purchased must be a non-negative number",
          })
          .optional(),
      })
      .optional(),
  }),
});

export const ReviewValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
