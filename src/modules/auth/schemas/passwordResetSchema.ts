import { Schema } from 'mongoose';

export default new Schema( {
    user:  {
        type: Schema.Types.ObjectId,
        ref:  'User',
    },
    token: String,
}, {
    timestamps: true,
} );
