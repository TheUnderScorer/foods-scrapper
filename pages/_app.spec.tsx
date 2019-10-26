import { mount } from 'enzyme';
import App from './_app';
import * as React from 'react';
import MockAdapter from 'axios-mock-adapter';
import client from './http/client';

jest.mock( './redux/actions/user/fetchCurrentUser', () => ( {
    default: () => ( {
        type:    'SetCurrentUser',
        payload: null,
    } ),
} ) );

jest.mock( './redux/stores/appStore', () => ( {
    default: {
        dispatch:  jest.fn(),
        getState:  jest.fn(),
        subscribe: jest.fn(),
    },
} ) );

describe( '_app', () =>
{
    let mockAdapter: MockAdapter;

    beforeEach( () =>
    {
        mockAdapter = new MockAdapter( client );
    } );

    it( 'renders without crashing', () =>
    {
        mount( <App/> );
    } );
} );
