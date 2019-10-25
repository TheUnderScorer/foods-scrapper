import { Action } from 'redux';
import { Nullable } from '../../types/Nullable';
import User from '../../../src/modules/users/interfaces/user.interface';

export interface SetCurrentUser extends Action<'SetCurrentUser'>
{
    payload: Nullable<User>
}

export type UserActions = SetCurrentUser;
