import TypedValue from '../../interfaces/typed-value.interface';
import Element from './element';
import { WaitForSelectorOptions } from 'puppeteer';

export default class PageMock
{
    public readonly typedValues: TypedValue[] = [];
    public readonly waitedSelectors: string[] = [];
    public readonly clickedSelectors: string[] = [];
    public readonly didWaits: number[] = [];
    public readonly elements: Element[] = [];

    public async type( selector: string, value: string ): Promise<this>
    {
        this.typedValues.push( {
            selector,
            value,
        } );

        return this;
    }

    public async waitForSelector( selector: string, options: WaitForSelectorOptions = {} ): Promise<Element>
    {
        const element = new Element( selector, options, this );

        this.waitedSelectors.push( selector );
        this.elements.push( element );

        return element;
    }

    public async waitFor( duration: number ): Promise<this>
    {
        this.didWaits.push( duration );

        return this;
    }

}
