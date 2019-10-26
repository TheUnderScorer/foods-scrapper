import * as React from 'react';
import { useEffect } from 'react';
import { NextPage } from 'next';
import ThemeProvider from './components/theme-provider/ThemeProvider';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './redux/stores/appStore';
import GlobalStyle from './components/global-style/GlobalStyle';
import fetchCurrentUser from './redux/actions/user/fetchCurrentUser';

const App: NextPage<any> = ( { Component, pageProps } ) =>
{
    useEffect( () =>
    {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector( '#jss-server-side' );

        if ( jssStyles ) {
            jssStyles.parentNode.removeChild( jssStyles );
        }
    } );

    useEffect( () =>
    {
        store.dispatch( fetchCurrentUser() as any );
    }, [] );

    return (
        <main>
            <Provider store={ store }>
                <ThemeProvider>
                    <GlobalStyle/>
                    <CssBaseline/>
                    { Component && <Component { ...pageProps } /> }
                </ThemeProvider>
            </Provider>
        </main>
    );
};

export default App;
