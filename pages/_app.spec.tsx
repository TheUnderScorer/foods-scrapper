import { mount } from 'enzyme';
import App from './_app';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import client from './http/client';
import { Routes } from './http/types/Routes';
import User from '../src/modules/users/types/User';
import { wait } from '../src/utils/timeout';
import store from './redux/stores/appStore';

jest.mock( './redux/actions/user/fetchCurrentUser', () => ({
    default: () => ({
        type: 'SetCurrentUser',
        payload: null,
    }),
}) );

jest.mock( './redux/stores/appStore', () => ({
    default: {
        dispatch: jest.fn(),
        getState: jest.fn().mockReturnValue( {
                                                 error: {
                                                     error: null,
                                                 },
                                             } ),
        subscribe: jest.fn(),
    },
}) );

describe( '_app', () => {
    let mockAdapter: MockAdapter;

    beforeEach( () => {
        mockAdapter = new MockAdapter( client );
    } );

    it( 'renders without crashing', () => {
        mount( <App/> );
    } );

    it( 'should fetch current user and display loading animation while doing so', async () => {
        const user: Partial<User> = {
            _id: '1',
        };

        mockAdapter.onGet( Routes.getMe ).replyOnce( 200, {
            result: user,
        } );

        await act( async () => {
            mount( <App/> );

            await wait( 10 );
        } );

        const dispatch = store.dispatch as jest.Mock;

        expect( dispatch ).toBeCalledWith( {
                                               type: 'SetCurrentUser',
                                               payload: null,
                                           } );
    } );
} );
