import { Dispatch } from 'redux';
import { SetUserFetched, UserActions } from './types/UserActions';
import client from '../../../http/client';
import { Routes } from '../../../http/types/Routes';
import ResponseResult from '../../../../src/types/ResponseResult';
import User from '../../../../src/modules/users/types/User';
import { ErrorActions } from '../error/types/ErrorActions';

export default () => async ( dispatch: Dispatch<UserActions | ErrorActions> ): Promise<SetUserFetched> =>
{
    try {
        const { data } = await client.get<ResponseResult<User>>( Routes.getMe );

        if ( data ) {
            dispatch( {
                type:    'SetCurrentUser',
                payload: data.result,
            } );
        }

    } catch ( e ) {
        console.error( 'fetchCurrentUser error: ', e );

        if ( !e.response || e.response.status !== 401 ) {
            dispatch( {
                type:    'SetError',
                payload: e,
            } );
        }
    }

    return dispatch( {
        type:    'SetUserFetched',
        payload: true,
    } );
}
