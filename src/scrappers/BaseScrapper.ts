import { Scrapper } from './interfaces/scrapper.interface';
import { Food } from '../foods/interfaces/food.interface';
import { Page } from 'puppeteer';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { ScrapperSelectors } from './interfaces/scrapper-selectors.interface';
import { Inject } from '@nestjs/common';
import { MealsListService } from './meals-list/meals-list.service';
import { EventEmitter } from 'events';

export default abstract class BaseScrapper extends EventEmitter implements Scrapper
{
    public readonly abstract selectors: ScrapperSelectors;
    public readonly abstract baseUrl: string;

    @Inject()
    protected readonly pageLoader: PageLoaderService;

    @Inject()
    protected readonly mealsList: MealsListService;

    public async execute( keywords: string[], location: string ): Promise<Food[]>
    {
        const page = await this.pageLoader.load( this.baseUrl );
        this.emit( 'page.loaded', page );

        const mealsPage = await this.handleLocation( page, location );
        this.emit( 'page.handledLocation', mealsPage );

        const restaurants = await this.mealsList.gatherRestaurants( mealsPage, this.selectors );
        this.emit( 'page.gatheredRestaurants', restaurants );

        return restaurants.map( meal => ( {
            name:  meal.name,
            price: 15,
            url:   '',
        } ) );
    }

    /**
     * Handles location search for given food provider and returns page with meals list
     * */
    public abstract handleLocation( page: Page, location: string ): Promise<Page>;
}
