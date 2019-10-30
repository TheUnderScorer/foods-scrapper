import mountWithStore from '../../test/mountWithStore';
import Header from './Header';
import * as React from 'react';
import User from '../../../src/modules/users/types/User';

describe( 'Header', () =>
{
    it( 'renders without crashing', () =>
    {
        mountWithStore( <Header/>, {
            user: {
                currentUser: null,
            },
        } );
    } );

    it( 'should display menu icon if user is logged in', () =>
    {
        const user: Partial<User> = {
            _id: '1',
        };

        const { component } = mountWithStore( <Header/>, {
            user: {
                currentUser: user,
            },
        } );
        const menuButton = component.find( '.menu-icon' ).at( 0 );
        expect( menuButton ).toHaveLength( 1 );
    } );
} );
