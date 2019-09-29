import { Injectable } from '@nestjs/common';
import { PageLoader } from './interfaces/page-loader.interface';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

@Injectable()
export class PageLoaderService implements PageLoader
{
    protected browser: Browser;

    public async load( url: string ): Promise<Page>
    {
        if ( !this.browser ) {
            await this.init();
        }

        const page = await this.browser.newPage();

        await page.setViewport( { width: 1920, height: 926 } );
        await page.goto( url );

        return page;
    }

    protected async init(): Promise<void>
    {
        this.browser = await puppeteer.launch( { headless: false } );
    }

}
