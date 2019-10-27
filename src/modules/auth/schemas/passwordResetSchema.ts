import { Schema } from 'mongoose';
import PasswordResetDocument from '../types/PasswordResetDocument';

const passwordResetSchema = new Schema( {
    user:  {
        type: Schema.Types.ObjectId,
        ref:  'User',
    },
    token: String,
}, {
    timestamps: true,
} );

passwordResetSchema.methods = {
    generateLink( this: PasswordResetDocument, siteUrl: string )
    {
        return `${ siteUrl }/auth/reset-password?token=${ this.token }`;
    },
};

export default passwordResetSchema;
