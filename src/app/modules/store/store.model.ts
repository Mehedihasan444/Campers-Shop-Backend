import { Schema, model } from 'mongoose';
import { TStore } from './store.interface';



const storeSchema = new Schema<TStore>({
    name: {
         type: String,
          required: true
         },
    positiveRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    shipOnTime: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    totalSales: {
        type: Number,
        default: 0,
        min: 0

    },
    profilePhoto: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        default: []
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    location: { type: String, required: true },
   
},{
    timestamps: true
});

export const Store = model<TStore>('Store', storeSchema);

