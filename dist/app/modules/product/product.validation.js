"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        price: zod_1.z.number().nonnegative(),
        quantity: zod_1.z.number().nonnegative(),
        description: zod_1.z.string().min(1),
        category: zod_1.z.string().min(1),
        brand: zod_1.z.string().min(1),
        image: zod_1.z.string().url(),
        rating: zod_1.z.number().min(0).max(5),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        price: zod_1.z.number().nonnegative().optional(),
        quantity: zod_1.z.number().nonnegative().optional(),
        description: zod_1.z.string().min(1).optional(),
        category: zod_1.z.string().min(1).optional(),
        image: zod_1.z.string().url().optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        brand: zod_1.z.string().min(1).optional(),
    }),
});
exports.ProductValidation = {
    productValidationSchema,
    updateProductValidationSchema,
};
