import ErrorState from './types/ErrorState';
import { ReducerHandlers } from '@theunderscorer/utils/dist/reducer/types/ReducerHandlers';
import { ErrorActions } from '../actions/error/types/ErrorActions';
import { reducer } from '@theunderscorer/utils/dist';

export const initialState: ErrorState = {
    error: null,
};

const handlers: ReducerHandlers<ErrorActions, ErrorState> = {
    SetError: ( state, error ) => ( {
        ...state,
        error,
    } ),
};

const errorReducer = reducer( handlers, initialState );

export default errorReducer;
