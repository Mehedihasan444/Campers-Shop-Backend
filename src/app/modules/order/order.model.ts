import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

type OptionalTOrder = Partial<TOrder>;




const orderSchema = new Schema<OptionalTOrder>({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        paymentMethod: { type: String, enum: ['stripe', 'cashOnDelivery'], required: true }
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    paymentDetails: {
        stripePaymentId: { type: String },
        status: { type: String },
        amount: { type: Number },
        currency: { type: String}
    },
    total: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], required: true,default: 'Pending' },
}, {
    timestamps: true 
});

export const Order = model<TOrder>('Order', orderSchema);
