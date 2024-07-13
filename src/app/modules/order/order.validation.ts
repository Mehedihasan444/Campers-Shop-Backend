import { z } from "zod";

const OrderValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().nonempty({ message: "Name is required" }),
      email: z.string().email({ message: "Invalid email format" }),
      phone: z.string().nonempty({ message: "Phone is required" }),
      address: z.string().nonempty({ message: "Address is required" }),
      paymentMethod: z.enum(["stripe", "cashOnDelivery"], {
        message: "Invalid payment method",
      }),
    }),
    items: z.array(
      z.object({
        id: z
          .string({ message: "Invalid ObjectId" })
          .nonempty({ message: "Item ID cannot be empty" }),
          purchasedQuantity: z.number().min(1, { message: "Quantity must be at least 1" }),
      })
    ),
    paymentDetails: z
      .object({
        stripePaymentId: z.string({ message: "Stripe payment ID is required" }),
        status: z.string({ message: "Status is required" }),
        amount: z.number({ message: "Amount must be positive" }),
        currency: z.string({ message: "Currency is required" }),
      })
      .optional(),
    total: z.number().positive({ message: "Total amount must be positive" }),
  }),
});

export const OrderValidation = { OrderValidationSchema };
