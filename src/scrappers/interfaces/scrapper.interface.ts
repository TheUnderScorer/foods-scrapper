import { Food } from '../../foods/interfaces/food.interface';

export interface Scrapper
{
    execute( keywords: string[], location: string ): Promise<Food[]>;
}
