import { GoogleLoginResponseOffline } from 'react-google-login';
import { onError, onSuccess } from './googleHandlers';
import GoogleError from './types/GoogleError';
import MockAdapter from 'axios-mock-adapter';
import client from '../../../http/client';
import User from '../../../../src/modules/users/types/User';
import { Routes } from '../../../http/types/Routes';

describe( 'googleHandlers', () =>
{
    let mockAxios: MockAdapter;

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
    } );

    it( 'onSuccess', async () =>
    {
        const mockUser: Partial<User> = {
            _id: '1',
        };
        mockAxios
            .onPost( Routes.googleLogin )
            .replyOnce( 200, {
                result: mockUser,
            } );

        const dispatch = jest.fn();
        const onError = jest.fn();
        const setLoading = jest.fn();
        const response: GoogleLoginResponseOffline = {
            code: 'CODE',
        };

        await onSuccess( setLoading, dispatch, onError )( response );

        expect( setLoading ).toBeCalledWith( false );
        expect( dispatch ).toBeCalledWith( {
            type: 'SetCurrentUser',
            payload: mockUser,
        } );
    } );

    it( 'onError', async () =>
    {
        const setLoading = jest.fn();
        const onErrorMock = jest.fn();
        const error: GoogleError = {
            error: 'ERROR',
        };

        await onError( setLoading, onErrorMock )( error );

        expect( setLoading ).toBeCalledWith( false );
    } );
} );
