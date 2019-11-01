import * as React from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document
{
    static async getInitialProps( ctx: any )
    {
        const sheet = new ServerStyleSheet();
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage( {
                enhanceApp: App => props => sheet.collectStyles(
                    sheets.collect( <App { ...props } /> ),
                ),
            } );

            const initialProps = await Document.getInitialProps( ctx );

            return {
                ...initialProps,
                styles: (
                            <>
                                { initialProps.styles }
                                { sheets.getStyleElement() }
                                { sheet.getStyleElement() }
                                { flush() || null }
                            </>
                        ),
            };
        } finally {
            sheet.seal();
        }
    }
}
