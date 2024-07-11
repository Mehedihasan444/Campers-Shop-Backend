import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    price: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
    description: z.string().min(1),
    category: z.string().min(1),
    brand: z.string().min(1),
    image: z.string().url(),
    rating: z.number().min(0).max(5),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    quantity: z.number().nonnegative().optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    image: z.string().url().optional(),
    rating: z.number().min(0).max(5).optional(),
    brand: z.string().min(1).optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
