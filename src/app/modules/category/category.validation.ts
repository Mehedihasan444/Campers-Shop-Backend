import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3)
      .max(30),
    description: z.string({
      required_error: "Description is required",
    }),
    // image: z.string({
    //   required_error: "Image is required",
    // }),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const categoryValidationSchema = {
  createCategorySchema,
  updateCategorySchema,
};
