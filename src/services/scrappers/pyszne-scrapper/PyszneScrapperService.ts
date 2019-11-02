import { Injectable, Scope } from '@nestjs/common';
import Scrapper from '../Scrapper';
import { Page } from 'puppeteer';
import ScrapperSelectors from '../types/ScrapperSelectors';

@Injectable( {
                 scope: Scope.REQUEST,
             } )
export class PyszneScrapperService extends Scrapper
{
    public readonly selectors: ScrapperSelectors = {
        mealAdditionalInfo: '.meal__description-additional-info',
        mealDescription: '.meal__description-choose-from',
        mealName: '.meal-name',
        mealPrice: '.meal__price',
        restaurantMenuItem: '.restaurant',
        restaurantMenuLink: 'a.restaurantname',
        restaurantName: 'a.restaurantname',
        mealWrapper: '.meal-container',
    };
    public readonly baseUrl: string = 'https://www.pyszne.pl/';
    private locationInput: string = '#imysearchstring';

    public async handleLocation( page: Page, location: string ): Promise<Page>
    {
        await page.type( this.locationInput, location );

        const places = await page.waitForSelector( '.lp__place', {
            timeout: 1500,
        } );
        await places.click();

        await page.waitForSelector( this.selectors.restaurantName );

        return page;
    }

}
