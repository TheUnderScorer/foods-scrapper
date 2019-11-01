import { Injectable } from '@nestjs/common';
import { PageLoader } from './types/PageLoader';
import puppeteer, { Browser, Page } from 'puppeteer';
import BrowserProcessesLimitExceeded from './exceptions/BrowserProcessesLimitExceeded';

@Injectable()
export class PageLoaderService implements PageLoader
{
    protected browser: Browser;
    protected pagesLimit = 300;

    public async load( url: string ): Promise<Page>
    {
        if ( !this.browser ) {
            await this.init();
        }

        const pages = await this.browser.pages();

        if ( pages.length >= this.pagesLimit ) {
            throw new BrowserProcessesLimitExceeded();
        }

        const page = await this.browser.newPage();

        await page.setViewport( { width: 1920, height: 926 } );
        await page.goto( url );

        return page;
    }

    protected async init(): Promise<void>
    {
        this.browser = await puppeteer.launch( { headless: true } );
    }

}
