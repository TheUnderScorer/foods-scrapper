import ErrorState from './types/ErrorState';
import errorReducer, { initialState } from './errorReducer';
import { SetError } from '../actions/error/types/ErrorActions';

describe( 'errorReducer', () =>
{
    let state: ErrorState;

    beforeEach( () =>
    {
        state = { ...initialState };
    } );

    it( 'SetError', () =>
    {
        const error = new Error( 'test' );
        const action: SetError = {
            type:    'SetError',
            payload: error,
        };

        const newState = errorReducer( state, action );

        expect( newState.error ).toEqual( error );
    } );
} );
