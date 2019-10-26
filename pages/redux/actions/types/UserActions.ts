import { Action } from 'redux';
import { Nullable } from '../../../types/Nullable';
import User from '../../../../src/modules/users/types/User';

export interface SetCurrentUser extends Action<'SetCurrentUser'>
{
    payload: Nullable<User>
}

export type UserActions = SetCurrentUser;
