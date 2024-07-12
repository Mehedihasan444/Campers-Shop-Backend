import { Types } from "mongoose";

export type TOrder={
        user:{
            name: string,
            email: string,
            phone: string,
            address: string,
            paymentMethod: 'stripe'|'cashOnDelivery'

        }
        items: [Types.ObjectId],
        paymentDetails?: {
          stripePaymentId: string,
          status: string,
          amount: number,
          currency: string,
        },
        total: number,
        status: 'Pending'| 'Shipped'| 'Delivered'| 'Cancelled'
}