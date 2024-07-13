"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
// Validation schema for creating a review
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z
            .string()
            .min(1, { message: "Product ID is required and must not be empty" }),
        rating: zod_1.z.object({
            rating: zod_1.z
                .number()
                .min(0, { message: "Rating must be at least 0" })
                .max(5, { message: "Rating must be at most 5" }),
            total_rating: zod_1.z
                .number()
                .nonnegative({ message: "Total rating must be a non-negative number" }),
        }),
        feedback: zod_1.z
            .string()
            .min(1, { message: "Feedback is required and must not be empty" }),
        feedback_description: zod_1.z
            .string()
            .min(1, {
            message: "Feedback description is required and must not be empty",
        }),
        product: zod_1.z.object({
            image: zod_1.z.string().url({ message: "Image must be a valid URL" }),
            name: zod_1.z
                .string()
                .min(1, { message: "Product name is required and must not be empty" }),
            product_purchased: zod_1.z
                .number()
                .nonnegative({
                message: "Product purchased must be a non-negative number",
            }),
        }),
    }),
});
// Validation schema for updating a review
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z
            .string()
            .min(1, { message: "Product ID must not be empty" })
            .optional(),
        rating: zod_1.z
            .object({
            rating: zod_1.z
                .number()
                .min(0, { message: "Rating must be at least 0" })
                .max(5, { message: "Rating must be at most 5" })
                .optional(),
            total_rating: zod_1.z
                .number()
                .nonnegative({
                message: "Total rating must be a non-negative number",
            })
                .optional(),
        })
            .optional(),
        feedback: zod_1.z
            .string()
            .min(1, { message: "Feedback must not be empty" })
            .optional(),
        feedback_description: zod_1.z
            .string()
            .min(1, { message: "Feedback description must not be empty" })
            .optional(),
        product: zod_1.z
            .object({
            image: zod_1.z
                .string()
                .url({ message: "Image must be a valid URL" })
                .optional(),
            name: zod_1.z
                .string()
                .min(1, { message: "Product name must not be empty" })
                .optional(),
            product_purchased: zod_1.z
                .number()
                .nonnegative({
                message: "Product purchased must be a non-negative number",
            })
                .optional(),
        })
            .optional(),
    }),
});
exports.ReviewValidation = {
    reviewValidationSchema,
    updateReviewValidationSchema,
};
