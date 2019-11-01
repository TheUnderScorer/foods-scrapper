import UserState from './types/UserState';
import userReducer, { initialState } from './userReducer';
import User from '../../../src/modules/users/types/User';
import { SetCurrentUser, SetUserFetched } from '../actions/user/types/UserActions';

describe( 'userReducer', () =>
{
    let state: UserState;

    beforeEach( () =>
    {
        state = { ...initialState };
    } );

    it( 'SetCurrentUser', () =>
    {
        const user: Partial<User> = {
            _id: '1',
        };
        const action: SetCurrentUser = {
            payload: user as User,
            type:    'SetCurrentUser',
        };

        const newState = userReducer( state, action );

        expect( newState.currentUser ).toEqual( user );
    } );

    it( 'SetUserFetched', () =>
    {
        const action: SetUserFetched = {
            type:    'SetUserFetched',
            payload: true,
        };

        const newState = userReducer( state, action );

        expect( newState.userFetched ).toEqual( action.payload );
    } );
} );
