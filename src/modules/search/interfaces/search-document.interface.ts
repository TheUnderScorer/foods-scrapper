import { Document } from 'mongoose';
import FoodDocument from '../../foods/interfaces/food-document.interface';
import Search from './search.interface';
import Food from '../../foods/interfaces/food.interface';

export default interface SearchDocument extends Document, Search
{
    foods: FoodDocument[] | Food[];
}
