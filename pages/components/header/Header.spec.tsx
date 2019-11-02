import mountWithStore from '../../test/mountWithStore';
import Header from './Header';
import * as React from 'react';
import User from '../../../src/modules/users/types/User';
import { act } from 'react-dom/test-utils';
import { wait } from '../../../src/utils/timeout';
import MockAdapter from 'axios-mock-adapter';
import client from '../../http/client';
import { Routes } from '../../http/types/Routes';

describe( 'Header', () =>
{
    let user: Partial<User>;
    let mockAxios: MockAdapter;

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
        user = {
            _id: '1',
        };
    } );

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
        const { component } = mountWithStore( <Header/>, {
            user: {
                currentUser: user,
            },
        } );
        const menuButton = component.find( '.menu-icon' ).at( 0 );
        expect( menuButton ).toHaveLength( 1 );
    } );

    it( 'logout button should handle logout', async () =>
    {
        mockAxios
            .onPost( Routes.logout )
            .replyOnce( 200, {
                result: true,
            } );

        const { component, store } = mountWithStore( <Header/>, {
            user: {
                currentUser: user,
            },
        } );

        const menuBtn = component.find( '.menu-icon' ).at( 0 );

        await act( async () =>
        {
            menuBtn.simulate( 'click' );

            await wait( 10 );
        } );

        component.update();

        const logoutBtn = component.find( '.logout' ).at( 0 );

        await act( async () =>
        {
            logoutBtn.simulate( 'click' );

            await wait( 100 );
        } );

        const actions = store.getActions();
        expect( actions ).toContainEqual( {
            type: 'SetCurrentUser',
            payload: null,
        } );
    } );
} );
