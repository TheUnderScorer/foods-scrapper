import { Inject, Injectable } from '@nestjs/common';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';
import { Food } from '../../foods/interfaces/food.interface';
import Restaurant from '../interfaces/restaurant.interface';
import { PageLoaderService } from '../../page-loader/page-loader.service';

@Injectable()
export class RestaurantService
{
    @Inject()
    protected pageLoader: PageLoaderService;

    public async handle( { name, link }: Restaurant, selectors: ScrapperSelectors ): Promise<Food[]>
    {
        const page = await this.pageLoader.load( link );

        const result = await page.evaluate( ( selectors: ScrapperSelectors, url: string, restaurantName: string ) =>
        {
            const foodElements = Array.from( document.querySelectorAll( selectors.mealWrapper ) );

            return foodElements.map( ( foodElement ): Food =>
            {
                const priceEl = foodElement.querySelector( selectors.mealPrice );
                const descriptionEl = foodElement.querySelector( selectors.mealDescription );
                const nameEl = foodElement.querySelector( selectors.mealName );

                return {
                    name:        nameEl.textContent,
                    price:       parseFloat( priceEl.textContent ),
                    url,
                    description: descriptionEl ? descriptionEl.textContent : '',
                    restaurantName,
                };
            } );
        }, selectors as any, link, name );

        await page.close();

        return result;
    }

}
