import { Document } from 'mongoose';
import FoodDocument from '../../foods/types/FoodDocument';
import Search from './Search';
import Food from '../../foods/types/Food';

export default interface SearchDocument extends Document, Search
{
    foods: FoodDocument[] | Food[];
}
