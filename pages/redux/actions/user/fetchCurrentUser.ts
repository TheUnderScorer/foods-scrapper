import { Dispatch } from 'redux';
import { SetUserFetched, UserActions } from './types/UserActions';
import client from '../../../http/client';
import { Routes } from '../../../http/types/Routes';
import ResponseResult from '../../../../src/types/ResponseResult';
import User from '../../../../src/modules/users/types/User';

export default () => async ( dispatch: Dispatch<UserActions> ): Promise<SetUserFetched> =>
{
    try {
        const { data } = await client.get<ResponseResult<User>>( Routes.getMe );

        if ( data ) {
            dispatch( {
                type:    'SetCurrentUser',
                payload: data.result,
            } );
        }

        return dispatch( {
            type:    'SetUserFetched',
            payload: true,
        } );

    } catch ( e ) {
        // TODO Dispatch error into errorReducer
        console.error( 'fetchCurrentUser error: ', e );

        throw e;
    }
}
