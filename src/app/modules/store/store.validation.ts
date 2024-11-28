import { z } from 'zod';

const createStoreValidationSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }).min(3).max(30),
    description: z.string(
        {
            required_error: 'Description is required',
        }
    ).max(500),
    profilePhoto: z.string({
        required_error: 'Profile photo is required',
    }).url(),
    location: z.string({
        required_error: 'Location is required',
    }),
});

const updateStoreValidationSchema = createStoreValidationSchema.partial();

export const storeValidationSchema={ createStoreValidationSchema, updateStoreValidationSchema };

