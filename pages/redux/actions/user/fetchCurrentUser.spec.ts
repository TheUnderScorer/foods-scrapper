import MockAdapter from 'axios-mock-adapter';
import client from '../../../http/client';
import User from '../../../../src/modules/users/types/User';
import { Routes } from '../../../http/types/Routes';
import fetchCurrentUser from './fetchCurrentUser';

describe( 'fetchCurrentUser', () => {
    let mockAxios: MockAdapter;
    let dispatch: jest.Mock;

    beforeEach( () => {
        mockAxios = new MockAdapter( client );
        dispatch = jest.fn();
    } );

    it( 'should fetch current user', async () => {
        const user: Partial<User> = {
            _id: '1',
        };

        mockAxios.onGet( Routes.getMe ).replyOnce( 200, {
            result: user,
        } );

        await fetchCurrentUser()( dispatch );

        const { mock: { calls } } = dispatch;

        expect( calls[ 0 ][ 0 ] ).toEqual( {
                                               type: 'SetCurrentUser',
                                               payload: user,
                                           } );

        expect( calls[ 1 ][ 0 ] ).toEqual( {
                                               type: 'SetUserFetched',
                                               payload: true,
                                           } );
    } );

    it( 'should dispatch setError on request error if status is not 401', async () => {
        mockAxios.onGet( Routes.getMe ).networkErrorOnce();

        await fetchCurrentUser()( dispatch );

        const { mock: { calls } } = dispatch;

        expect( calls[ 0 ][ 0 ].type ).toEqual( 'SetError' );
    } );
} );
