"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            name: zod_1.z.string().nonempty({ message: "Name is required" }),
            email: zod_1.z.string().email({ message: "Invalid email format" }),
            phone: zod_1.z.string().nonempty({ message: "Phone is required" }),
            address: zod_1.z.string().nonempty({ message: "Address is required" }),
            paymentMethod: zod_1.z.enum(["stripe", "cashOnDelivery"], {
                message: "Invalid payment method",
            }),
        }),
        items: zod_1.z.array(zod_1.z.object({
            id: zod_1.z
                .string({ message: "Invalid ObjectId" })
                .nonempty({ message: "Item ID cannot be empty" }),
            purchasedQuantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
        })),
        paymentDetails: zod_1.z
            .object({
            stripePaymentId: zod_1.z.string({ message: "Stripe payment ID is required" }),
            status: zod_1.z.string({ message: "Status is required" }),
            amount: zod_1.z.number({ message: "Amount must be positive" }),
            currency: zod_1.z.string({ message: "Currency is required" }),
        })
            .optional(),
        total: zod_1.z.number().positive({ message: "Total amount must be positive" }),
    }),
});
exports.OrderValidation = { OrderValidationSchema };
