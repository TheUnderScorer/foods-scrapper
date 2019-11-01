import LoginPage from './Login';
import * as React from 'react';
import mountWithStore from '../test/mountWithStore';

describe( 'Login component', () =>
{
    it( 'Renders without crashing', () =>
    {
        mountWithStore( <LoginPage/>, {
            user: {
                userFetched: false,
                currentUser: null,
            },
        } );
    } );
} );
