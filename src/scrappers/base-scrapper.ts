import { Scrapper } from './interfaces/scrapper.interface';
import { Food } from '../foods/interfaces/food.interface';
import { Page } from 'puppeteer';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { ScrapperSelectors } from './interfaces/scrapper-selectors.interface';
import { Inject } from '@nestjs/common';
import { MealsListService } from './meals-list/meals-list.service';
import { RestaurantService } from './restaurant/restaurant.service';
import { flatten } from 'lodash';
import { Subject } from 'rxjs';
import ScrapperAction, { ScrapperActions } from './interfaces/scrapper-action.interface';

export default abstract class BaseScrapper implements Scrapper
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
        const subject = new Subject<ScrapperAction<any>>();

        const page = await this.pageLoader.load( this.baseUrl, subject );
        const mealsPage = await this.handleLocation( page, location );
        const restaurants = await this.mealsList.gatherRestaurants( mealsPage, this.selectors );
        const restaurantsPromises = restaurants.map( restaurant => this.restaurants.handle( restaurant, this.selectors ) );

        const foodsResult = await Promise.all( restaurantsPromises );
        const foods = flatten( foodsResult );

        subject.next( {
            action:  ScrapperActions.Done,
            payload: foods,
        } );
        subject.complete();

        return foods;
    }

    /**
     * Handles location search for given food provider and returns page with meals list
     * */
    public abstract handleLocation( page: Page, location: string ): Promise<Page>;
}
