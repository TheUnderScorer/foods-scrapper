import MockAdapter from 'axios-mock-adapter';
import client from '../../../http/client';
import User from '../../../../src/modules/users/types/User';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import * as faker from 'faker';
import { Routes } from '../../../http/types/Routes';
import { onSuccess } from './facebookHandlers';

describe( 'facebookHandlers', () =>
{
    let mockAxios: MockAdapter;

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
    } );

    it( 'onSuccess', async () =>
    {
        const dispatch = jest.fn();
        const setLoading = jest.fn();
        const onError = jest.fn();

        const mockUser: Partial<User> = {
            _id: '1',
        };

        const mockFBUser: Partial<ReactFacebookLoginInfo> = {
            id: faker.random.uuid(),
            email: faker.internet.email(),
        };
        mockAxios
            .onPost( Routes.facebookLogin )
            .replyOnce( 200, {
                result: mockUser,
            } );

        await onSuccess( setLoading, dispatch, onError )
        ( mockFBUser as ReactFacebookLoginInfo );

        expect( onError ).toBeCalledTimes( 0 );
        expect( dispatch ).toBeCalledWith( {
            type: 'SetCurrentUser',
            payload: mockUser,
        } );
        expect( setLoading ).toBeCalledWith( false );
    } );
} );