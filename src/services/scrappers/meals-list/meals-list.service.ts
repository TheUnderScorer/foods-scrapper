import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';
import Restaurant from '../interfaces/restaurant.interface';
import MealPageParams from '../interfaces/meal-page-params.interface';

@Injectable()
export class MealsListService
{
    public async gatherRestaurants( mealPage: Page, selectors: ScrapperSelectors ): Promise<Restaurant[]>
    {
        return await mealPage.evaluate( async ( { selectors }: MealPageParams ) =>
        {
            const meals = Array.from( document.querySelectorAll( selectors.restaurantMenuItem ) );

            if ( !meals.length ) {
                return null;
            }

            const result: Restaurant[] = [];

            meals.forEach( meal =>
            {
                const link = meal.querySelector( selectors.restaurantMenuLink );
                const name = meal.querySelector( selectors.restaurantName );

                if ( !link || !name ) {
                    return;
                }

                result.push( {
                    link: `${ location.origin }/${ link.getAttribute( 'href' ) }`,
                    name: name.textContent,
                } );
            } );

            return result;
        }, { selectors, pageUrl: await mealPage.url() } as any );
    }
}
