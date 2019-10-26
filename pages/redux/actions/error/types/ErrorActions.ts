import { Action } from 'redux';
import { Nullable } from '../../../../types/Nullable';

export interface SetError extends Action<'SetError'>
{
    payload: Nullable<Error>;
}

export type ErrorActions = SetError;
