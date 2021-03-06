import { Action } from 'redux';
import { Nullable } from '../../../../../src/types/Nullable';
import User from '../../../../../src/modules/users/types/User';

export interface SetCurrentUser extends Action<'SetCurrentUser'>
{
    payload: Nullable<User>
}

export interface SetUserFetched extends Action<'SetUserFetched'>
{
    payload: boolean;
}

export type UserActions = SetCurrentUser | SetUserFetched;
