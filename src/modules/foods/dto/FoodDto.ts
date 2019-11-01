import Food from '../types/Food';
import { IsNumber, IsString } from 'class-validator';

export default class FoodDto implements Food
{
    @IsString()
    public description: string;

    @IsString()
    public name: string;

    @IsNumber()
    public price: number;

    @IsString()
    public restaurantName: string;

    @IsString()
    public url: string;
}
