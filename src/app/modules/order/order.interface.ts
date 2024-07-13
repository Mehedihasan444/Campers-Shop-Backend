import { Types } from "mongoose";

export type TOrder={
        user:{
            name: string,
            email: string,
            phone: string,
            address: string,
            paymentMethod: 'stripe'|'cashOnDelivery'

        }
        items: [{id:Types.ObjectId,purchasedQuantity:number}],
        paymentDetails?: {
          stripePaymentId: string,
          status: string,
          amount: number,
          currency: string,
        },
        total: number,
        status: 'Pending'| 'Shipped'| 'Delivered'| 'Cancelled'
}