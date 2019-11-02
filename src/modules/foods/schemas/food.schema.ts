import { Schema } from 'mongoose';

export default new Schema( {
                               name: String,
                               price: Number,
                               url: String,
                               description: String,
                               restaurantName: String,
                           } );
