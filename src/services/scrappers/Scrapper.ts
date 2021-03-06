import ScrapperInterface from './types/Scrapper';
import Food from '../../modules/foods/types/Food';
import { Page } from 'puppeteer';
import { PageLoaderService } from '../page-loader/PageLoaderService';
import ScrapperSelectors from './types/ScrapperSelectors';
import { Inject } from '@nestjs/common';
import { MealsListService } from './meals-list/MealsListService';
import { RestaurantService } from './restaurant/RestaurantService';
import { flatten } from 'lodash';
import pLimit from 'p-limit';

export default abstract class Scrapper implements ScrapperInterface
{
    public readonly abstract selectors: ScrapperSelectors;
    public readonly abstract baseUrl: string;

    @Inject()
    protected readonly pageLoader: PageLoaderService;

    @Inject()
    protected readonly mealsList: MealsListService;

    @Inject()
    protected readonly restaurants: RestaurantService;

    public async execute( keywords: string[], location: string ): Promise<Food[]>
    {
        const page = await this.pageLoader.load( this.baseUrl );
        const mealsPage = await this.handleLocation( page, location );
        const restaurants = await this.mealsList.gatherRestaurants( mealsPage, this.selectors );

        await mealsPage.close();

        const limit = pLimit( 5 );
        const restaurantsPromises = restaurants.map( restaurant =>
            limit( () => this.restaurants.handle( keywords, restaurant, this.selectors ) ) );
        const foodsResult = await Promise.all( restaurantsPromises );

        return flatten( foodsResult );
    }

    /**
     * Handles location search for given food provider and returns page with meals list
     * */
    public abstract handleLocation( page: Page, location: string ): Promise<Page>;
}
