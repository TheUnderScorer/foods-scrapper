import Food from '../../foods/interfaces/food.interface';

export default interface Scrapper
{
    execute( keywords: string[], location: string ): Promise<Food[]>;
}
