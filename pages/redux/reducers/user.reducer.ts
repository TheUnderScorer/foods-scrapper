import UserReducer from './interfaces/user-reducer.interface';
import { ReducerHandlers } from '@theunderscorer/utils/dist/reducer/types/ReducerHandlers';
import { UserActions } from '../actions/user.actions';
import { reducer } from '@theunderscorer/utils/dist';

export const initialState: UserReducer = {
    currentUser: null,
};

const handlers: ReducerHandlers<UserActions, UserReducer> = {
    SetCurrentUser: ( state, currentUser ) => ( {
        ...state,
        currentUser,
    } ),
};

const userReducer = reducer( handlers, initialState );

export default userReducer;
