import LoginPage from './Login';
import * as React from 'react';
import mountWithStore from '../test/mountWithStore';
import ThemeProvider from '../components/theme-provider/ThemeProvider';

describe( 'Login component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mountWithStore( <ThemeProvider><LoginPage/></ThemeProvider>, {
            user: {
                userFetched: false,
                currentUser: null,
            },
        } );
    } );
} );
