import { Inject, Injectable } from '@nestjs/common';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';
import Food from '../../foods/interfaces/food.interface';
import Restaurant from '../interfaces/restaurant.interface';
import { PageLoaderService } from '../../page-loader/page-loader.service';

@Injectable()
export class RestaurantService
{
    @Inject()
    protected pageLoader: PageLoaderService;

    public async handle( keywords: string[], { name, link }: Restaurant, selectors: ScrapperSelectors ): Promise<Food[]>
    {
        const page = await this.pageLoader.load( link );

        console.log( 'Handling restaurant: ', name );

        const result = await page.evaluate( ( selectors: ScrapperSelectors, url: string, restaurantName: string, keywords: string[] ) =>
        {
            const foodElements = Array.from( document.querySelectorAll( selectors.mealWrapper ) );
            const result: Food[] = [];

            const matchesKeyword = ( element: HTMLElement | null ): boolean =>
            {
                if ( !element ) {
                    return false;
                }

                const content = element.textContent.toLowerCase();

                for ( const keyword of keywords ) {
                    if ( content.includes( keyword ) ) {
                        return true;
                    }
                }

                return false;
            };

            foodElements.forEach( ( foodElement ) =>
            {
                const priceEl = foodElement.querySelector( selectors.mealPrice );
                const descriptionEl = foodElement.querySelector( selectors.mealDescription ) as HTMLElement;
                const additionalInfoEl = foodElement.querySelector( selectors.mealAdditionalInfo ) as HTMLElement;
                const nameEl = foodElement.querySelector( selectors.mealName ) as HTMLElement;

                if ( !matchesKeyword( descriptionEl ) && !matchesKeyword( nameEl ) && !matchesKeyword( additionalInfoEl ) ) {
                    return;
                }

                result.push( {
                    name:        nameEl.textContent,
                    price:       parseFloat( priceEl.textContent ),
                    url,
                    description: `${ additionalInfoEl ? additionalInfoEl.textContent : '' }. ${ descriptionEl ? descriptionEl.textContent : '' }`,
                    restaurantName,
                } );
            } );

            return result;
        }, selectors as any, link, name, keywords );

        await page.close();

        return result;
    }

}
