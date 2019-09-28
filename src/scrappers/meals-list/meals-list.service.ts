import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';

@Injectable()
export class MealsListService
{
    public async gatherMealsList( mealPage: Page, selectors: ScrapperSelectors ): Promise<string[]>
    {
        return await mealPage.evaluate( ( selectors: ScrapperSelectors ) =>
        {
            const meals = Array.from( document.querySelectorAll( selectors.restaurantMenuItem ) );

            return meals
                .map( meal => meal.textContent.trim() )
                .filter( meal => meal );
        }, selectors as any );
    }
}
