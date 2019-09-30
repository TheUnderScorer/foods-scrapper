import { Schema } from 'mongoose';

export const FoodSchema = new Schema( {
    name:           String,
    price:          Number,
    url:            String,
    description:    String,
    restaurantName: String,
} );
