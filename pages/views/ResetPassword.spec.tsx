import * as React from 'react';
import ResetPassword from './ResetPassword';
import mountWithStore from '../test/mountWithStore';

describe( 'ResetPassword', () =>
{
    it( 'renders without crashing', () =>
    {
        mountWithStore( <ResetPassword/>, {
            user: {
                currentUser: null,
            },
        } );
    } );

    it( 'should render error if no token is provided', () =>
    {
        Object.assign( process, {
            browser: true,
        } );

        const { component } = mountWithStore( <ResetPassword/>, {
            user: {
                currentUser: null,
            },
        } );
        const error = component.find( '.error' ).at( 0 );

        expect( error.text() ).toEqual( 'Error: No reset password token provided.' );
    } );
} );
