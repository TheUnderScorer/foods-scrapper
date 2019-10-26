import { Schema } from 'mongoose';
import { UserRoles } from '../enum/UserRoles';

export default new Schema( {
    email:             {
        type:      String,
        unique:    true,
        maxlength: 150,
        trim:      true,

    },
    password:          {
        maxlength: 150,
        type:      String,
    },
    role:              {
        default: UserRoles.user,
        type:    String,
    },
    resetPasswordDate: Date,
}, {
    timestamps: true,
} );
