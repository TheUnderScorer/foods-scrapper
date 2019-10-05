import User from './user.interface';
import { Document } from 'mongoose';

export default interface UserDocument extends User, Document
{
}
