import Food from '../../foods/interfaces/food.interface';
import { Types } from 'mongoose';
import UserDocument from '../../users/interfaces/user-document.interface';

export default interface Search
{
    searchID: string | Types.ObjectId;
    user: UserDocument | number;
    status: SearchStatus;
    date: Date;
    error?: string;
    keywords: string[];
    location: string;
    services: string[];
    foods: Food[];
}

export enum SearchStatus
{
    Pending = 'Pending',
    Done    = 'Done',
    Error   = 'Error'
}
