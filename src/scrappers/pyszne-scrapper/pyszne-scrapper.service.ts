import { Injectable } from '@nestjs/common';
import BaseScrapper from '../BaseScrapper';
import { Page } from 'puppeteer';
import { ScrapperSelectors } from '../interfaces/scrapper-selectors.interface';

@Injectable()
export class PyszneScrapperService extends BaseScrapper
{
    public readonly selectors: ScrapperSelectors = {
        mealAdditionalInfo: '.meal__description-additional-info',
        mealDescription:    '.meal__description-choose-from',
        mealName:           '.meal-name',
        mealPrice:          '.meal__price',
        restaurantMenuItem: '.restaurant',
        restaurantMenuLink: 'a.restaurantname',
        restaurantName:     '.restaurant-name > h1',
        mealWrapper:        '.meal-container',
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

        await page.waitFor( 1500 );

        return page;
    }

}
