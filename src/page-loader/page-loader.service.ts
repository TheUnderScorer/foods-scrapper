import { Injectable } from '@nestjs/common';
import { PageLoader } from './interfaces/page-loader.interface';
import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

@Injectable()
export class PageLoaderService implements PageLoader
{
    public async load( url: string ): Promise<Page>
    {
        const browser = await puppeteer.launch( { headless: false } );
        const page = await browser.newPage();

        await page.setViewport( { width: 1920, height: 926 } );
        await page.goto( url );

        return page;
    }

}
