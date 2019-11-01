import { Schema } from 'mongoose';
import PasswordReset from '../../auth/types/PasswordReset';

export default interface User
{
    _id: string | Schema.Types.ObjectId;
    email: string;
    password: string;
    updatedAt?: Date;
    createdAt?: Date;
    passwordReset?: PasswordReset;
    googleID?: string;
    facebookID?: string;
}
