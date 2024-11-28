"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidationSchema = void 0;
const zod_1 = require("zod");
const createStoreValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }).min(3).max(30),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }).max(500),
    profilePhoto: zod_1.z.string({
        required_error: 'Profile photo is required',
    }).url(),
    location: zod_1.z.string({
        required_error: 'Location is required',
    }),
});
const updateStoreValidationSchema = createStoreValidationSchema.partial();
exports.storeValidationSchema = { createStoreValidationSchema, updateStoreValidationSchema };
