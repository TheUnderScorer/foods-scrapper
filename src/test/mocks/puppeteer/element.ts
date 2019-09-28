import { WaitForSelectorOptions } from 'puppeteer';
import PageMock from './page-mock';

export default class Element
{
    public constructor(
        public readonly selector: string,
        public readonly options: WaitForSelectorOptions,
        public readonly page: PageMock,
    )
    {
    }

    public async click(): Promise<void>
    {
        this.page.clickedSelectors.push( this.selector );
    }
}
