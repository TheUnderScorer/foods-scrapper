import * as React from 'react';
import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import ThemeProvider from './components/theme-provider/ThemeProvider';
import { CssBaseline } from '@material-ui/core';

const App: NextPage<any> = ( { Component, pageProps, title, ...props } ) =>
{
    useEffect( () =>
    {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector( '#jss-server-side' );
        if ( jssStyles ) {
            jssStyles.parentNode.removeChild( jssStyles );
        }
    } );

    return (
        <>
            <ThemeProvider>
                <CssBaseline/>
                <Component { ...pageProps } />
            </ThemeProvider>
        </>
    );
};

App.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;
    console.log( { ctx } );

    return { ...query };
};

export default App;
