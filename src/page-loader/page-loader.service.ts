import { Injectable } from '@nestjs/common';
import { PageLoader } from './interfaces/page-loader.interface';
import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import { Observable } from 'rxjs';
import ScrapperAction, { ScrapperActions } from '../scrappers/interfaces/scrapper-action.interface';
import BrowserProcessesLimitExceeded from './exceptions/BrowserProcessesLimitExceeded';

@Injectable()
export class PageLoaderService implements PageLoader
{
    protected browser: Browser;
    protected pageProcesses: number = 0;
    protected processesLimit = 300;

    public async load( url: string, observable: Observable<ScrapperAction<any>> ): Promise<Page>
    {
        if ( !this.browser ) {
            await this.init();
        }

        if ( this.pageProcesses >= this.processesLimit ) {
            throw new BrowserProcessesLimitExceeded();
        }

        this.pageProcesses++;

        this.handleObservable( observable );

        const page = await this.browser.newPage();

        await page.setViewport( { width: 1920, height: 926 } );
        await page.goto( url );

        return page;
    }

    protected handleObservable( observable: Observable<ScrapperAction<any>> ): void
    {
        observable.subscribe( data =>
        {
            if ( data.action === ScrapperActions.Done ) {
                this.pageProcesses--;
            }
        } );
    }

    protected async init(): Promise<void>
    {
        this.browser = await puppeteer.launch( { headless: false } );
    }

}
