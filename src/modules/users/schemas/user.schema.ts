import { Schema } from 'mongoose';
import { UserRoles } from '../enum/UserRoles';

export default new Schema( {
    email:    String,
    password: String,
    role:     {
        default: UserRoles.user,
        type:    String,
    },
}, {
    timestamps: true,
} );
