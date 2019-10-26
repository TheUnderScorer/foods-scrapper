import UserState from './types/UserState';
import { ReducerHandlers } from '@theunderscorer/utils/dist/reducer/types/ReducerHandlers';
import { UserActions } from '../actions/types/UserActions';
import { reducer } from '@theunderscorer/utils/dist';

export const initialState: UserState = {
    currentUser: null,
};

const handlers: ReducerHandlers<UserActions, UserState> = {
    SetCurrentUser: ( state, currentUser ) => ( {
        ...state,
        currentUser,
    } ),
};

const userReducer = reducer( handlers, initialState );

export default userReducer;
