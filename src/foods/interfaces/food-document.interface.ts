import Food from './food.interface';
import { Document } from 'mongoose';

export default interface FoodDocument extends Food, Document
{
}
