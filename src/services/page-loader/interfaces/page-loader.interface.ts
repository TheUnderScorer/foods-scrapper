import { Page } from 'puppeteer';
import { Observable } from 'rxjs';

export interface PageLoader
{
    load( url: string, observable: Observable<any> ): Promise<Page>;
}
