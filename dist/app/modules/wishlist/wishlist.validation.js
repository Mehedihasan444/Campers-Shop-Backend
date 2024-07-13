"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistProductValidation = void 0;
const zod_1 = require("zod");
const wishlistValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z.string(),
    }),
});
exports.WishlistProductValidation = {
    wishlistValidationSchema,
};
