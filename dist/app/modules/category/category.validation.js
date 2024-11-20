"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }).min(3).max(30),
    image: zod_1.z.string({
        required_error: 'Image is required',
    }),
});
const updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    productCount: zod_1.z.number().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.categoryValidationSchema = {
    createCategorySchema,
    updateCategorySchema
};
