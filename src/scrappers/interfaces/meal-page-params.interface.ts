import { ScrapperSelectors } from './scrapper-selectors.interface';

export default interface MealPageParams
{
    selectors: ScrapperSelectors;
    pageUrl: string;
}
