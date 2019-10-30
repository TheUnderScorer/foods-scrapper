import * as React from 'react';
import ResetPassword from './ResetPassword';
import mountWithStore from '../test/mountWithStore';
import { wait } from '../../src/utils/timeout';
import ResetPasswordForm from '../components/reset-password-form/ResetPasswordForm';
import * as faker from 'faker';

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

        const query = new URLSearchParams();

        const { component } = mountWithStore( <ResetPassword query={ query }/>, {
            user: {
                currentUser: null,
            },
        } );
        const error = component.find( '.error' ).at( 0 );
        expect( error.text() ).toEqual( 'Error: No reset password token provided.' );
    } );

    it( 'should display password reset form if query has token', async () =>
    {
        const query = new URLSearchParams();
        query.set( 'token', faker.random.uuid() );

        const { component } = mountWithStore( <ResetPassword query={ query }/>, {
            user: {
                currentUser: null,
            },
        } );

        await wait( 100 );

        const form = component.update().find( ResetPasswordForm );
        expect( form ).toHaveLength( 1 );
    } );
} );
