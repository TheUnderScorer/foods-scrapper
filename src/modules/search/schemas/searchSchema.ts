import { Schema } from 'mongoose';
import foodSchema from '../../foods/schemas/food.schema';

export default new Schema( {
    date:     Date,
    searchID: Schema.Types.ObjectId,
    user:     {
        type: Schema.Types.ObjectId,
        ref:  'User',
    },
    status:   String,
    error:    String,
    keywords: [ String ],
    services: [ String ],
    location: String,
    foods:    [ foodSchema ],
} );
