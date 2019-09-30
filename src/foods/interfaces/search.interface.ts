import Food from './food.interface';
import { Types } from 'mongoose';

export default interface Search
{
    searchID: string | Types.ObjectId;
    status: SearchStatus;
    date: Date;
    foods: Food[];
}

export enum SearchStatus
{
    Pending = 'Pending',
    Done    = 'Done',
    Error   = 'Error'
}
