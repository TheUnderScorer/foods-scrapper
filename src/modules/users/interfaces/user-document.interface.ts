import User from './user.interface';
import { Document, Schema } from 'mongoose';

export default interface UserDocument extends User, Document
{
    _id: Schema.Types.ObjectId;
}
