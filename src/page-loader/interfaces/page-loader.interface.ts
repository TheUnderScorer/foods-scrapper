import { Page } from 'puppeteer';

export interface PageLoader
{
    load( url: string ): Promise<Page>;
}
