import { Schema } from 'mongoose';
import foodSchema from './food.schema';

export default new Schema( {
    date:     Date,
    searchID: Schema.Types.ObjectId,
    status:   String,
    foods:    [ foodSchema ],
} );
