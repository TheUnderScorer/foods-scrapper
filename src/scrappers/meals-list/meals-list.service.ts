import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';
import Restaurant from '../interfaces/restaurant.interface';
import MealPageParams from '../interfaces/meal-page-params.interface';

@Injectable()
export class MealsListService
{
    public async gatherMealsList( mealPage: Page, selectors: ScrapperSelectors ): Promise<Restaurant[]>
    {
        return await mealPage.evaluate( async ( { selectors, pageUrl }: MealPageParams ) =>
        {
            const meals = Array.from( document.querySelectorAll( selectors.restaurantMenuItem ) );

            if ( !meals.length ) {
                throw new Error( `Invalid meal or link selector provided for page ${ pageUrl }` );
            }

            return meals
                .map( meal =>
                {
                    const link = meal.querySelector( selectors.restaurantMenuLink );
                    const name = meal.querySelector( selectors.restaurantName );

                    if ( !link || !name ) {
                        throw new Error( `Invalid meal or link selector provided for page ${ pageUrl }` );
                    }

                    return {
                        link: link.getAttribute( 'href' ),
                        name: name.textContent,
                    };
                } );
        }, { selectors, pageUrl: await mealPage.url() } as any );
    }
}
