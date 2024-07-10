import { z } from "zod";

const wishlistValidationSchema = z.object({
  body: z.object({
    product: z.string(),
  }),
});
export const WishlistProductValidation = {
    wishlistValidationSchema,
  };