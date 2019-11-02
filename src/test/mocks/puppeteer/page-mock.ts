import TypedValue from '../../types/TypedValue';
import Element from './element';
import { WaitForSelectorOptions } from 'puppeteer';
import { JSDOM } from 'jsdom';
import { EventEmitter } from 'events';

export default class PageMock extends EventEmitter
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

    public async evaluate<T>( callback: ( ...args ) => T | Promise<T>, callbackArgs?: any ): Promise<T>
    {
        const dom = new JSDOM();

        // Give access to document object inside callback
        global.document = dom.window.document;
        global.location = dom.window.location;

        this.emit( 'document.setup', dom.window.document );

        const result = await callback( callbackArgs );

        delete global.document;

        return result;
    }

    public async url(): Promise<string>
    {
        return '';
    }

}
