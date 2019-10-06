import { Schema } from 'mongoose';

export default interface User
{
    _id: string | Schema.Types.ObjectId;
    email: string;
    password: string;
    updatedAt?: Date;
    createdAt?: Date;
}
