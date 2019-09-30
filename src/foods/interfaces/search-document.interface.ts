import { Document } from 'mongoose';
import FoodDocument from './food-document.interface';
import Search from './search.interface';
import Food from './food.interface';

export default interface SearchDocument extends Document, Search
{
    foods: FoodDocument[] | Food[];
}
