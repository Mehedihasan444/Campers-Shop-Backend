import { z } from 'zod';

 const createCategorySchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }).min(3).max(30),
    image: z.string({
        required_error: 'Image is required',
    }),
});

 const updateCategorySchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    productCount: z.number().optional(),
    isDeleted: z.boolean().optional(),
});

export const categoryValidationSchema = {
    createCategorySchema,
    updateCategorySchema
}