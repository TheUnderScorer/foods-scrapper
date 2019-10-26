import Food from '../../../modules/foods/types/Food';

export default interface Scrapper
{
    execute( keywords: string[], location: string ): Promise<Food[]>;
}
