import MockAdapter from 'axios-mock-adapter';
import client from '../../../http/client';
import User from '../../../../src/modules/users/types/User';
import logout from './logout';
import { Routes } from '../../../http/types/Routes';
import { SetCurrentUser } from './types/UserActions';
import UserNotLoggedInException from '../../../exceptions/UserNotLoggedInException';

describe( 'logout action', () =>
{
    let mockAxios: MockAdapter;
    let user: Partial<User>;
    const getState = () => ( {
        user: {
            currentUser: user,
        },
    } );

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( client );
        user = {
            _id: '1',
        };
    } );

    it( 'should handle logout', async () =>
    {
        mockAxios
            .onPost( Routes.logout )
            .replyOnce( 200, {
                result: true,
            } );

        const dispatch = jest.fn();
        await logout()( dispatch, getState as any );

        expect( dispatch ).toBeCalledWith( {
            type:    'SetCurrentUser',
            payload: null,
        } );
        expect( dispatch ).toBeCalledTimes( 1 );
    } );

    it( 'should throw error if user is not logged in', async () =>
    {
        const getState = () => ( {
            user: {
                currentUser: null,
            },
        } );

        const dispatch = jest.fn();
        await logout()( dispatch, getState as any );

        expect( dispatch ).toBeCalledWith( {
            type:    'SetError',
            payload: new UserNotLoggedInException( 'logout' ),
        } );
    } );

} );
