import Food from './Food';
import { Document } from 'mongoose';

export default interface FoodDocument extends Food, Document
{
}
