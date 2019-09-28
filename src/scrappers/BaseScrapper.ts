import { Scrapper } from './interfaces/scrapper.interface';
import { Food } from '../foods/interfaces/food.interface';
import { Page } from 'puppeteer';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { ScrapperSelectors } from './interfaces/scrapper-selectors.interface';
import { Inject } from '@nestjs/common';

export default abstract class BaseScrapper implements Scrapper
{
    public readonly abstract selectors: ScrapperSelectors;
    public readonly abstract baseUrl: string;

    @Inject()
    protected readonly pageLoader: PageLoaderService;

    public async execute( keywords: string[], location: string ): Promise<Food[]>
    {
        const page = await this.pageLoader.load( this.baseUrl );
        const mealsPage = await this.handleLocation( page, location );
        const meal = await this.gatherMealsList( mealsPage );

        return meal.map( meal => ( {
            name:  meal,
            price: 15,
            url:   '',
        } ) );
    }

    /**
     * Handles location search for given food provider and returns page with meals list
     * */
    public abstract handleLocation( page: Page, location: string ): Promise<Page>;

    private async gatherMealsList( mealPage: Page ): Promise<string[]>
    {
        await mealPage.screenshot( {
            path: `${ __dirname }/mealsList.png`,
        } );

        return await mealPage.evaluate( ( selectors: ScrapperSelectors ) =>
        {
            const meals = Array.from( document.querySelectorAll( selectors.restaurantMenuItem ) );

            return meals
                .map( meal => meal.textContent.trim() )
                .filter( meal => meal );
        }, this.selectors as any );
    }
}
