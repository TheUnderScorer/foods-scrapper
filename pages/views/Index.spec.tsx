import { mount } from 'enzyme';
import Index from './Index';
import * as React from 'react';
import MockAdapter from 'axios-mock-adapter';
import client from '../http/client';
import { wait } from '../../src/utils/timeout';
import redirect from '../http/redirect';
import { act } from 'react-dom/test-utils';

jest.mock( '../http/redirect', () => ( {
    default: jest.fn(),
} ) );

describe( 'Index component', () =>
{
    let mockAdapter: MockAdapter;

    beforeEach( () =>
    {
        jest.resetModules();

        mockAdapter = new MockAdapter( client );
    } );

    it( 'renders without crashing', () =>
    {
        mount( <Index/> );
    } );

    it( 'should redirect to login page if user is not logged in', async () =>
    {
        mockAdapter.onPost( '/users/me' ).replyOnce( 200, {
            result: null,
        } );

        const mockRedirect = redirect as jest.Mock;

        await act( async () =>
        {
            mount( <Index/> );

            await wait( 500 );
        } );

        expect( mockRedirect ).toBeCalledWith( '/auth/login' );
    } );
} );
