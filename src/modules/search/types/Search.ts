import Food from '../../foods/types/Food';
import { Types } from 'mongoose';
import UserDocument from '../../users/types/UserDocument';

export default interface Search
{
    searchID: string | Types.ObjectId;
    user: UserDocument | string;
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
