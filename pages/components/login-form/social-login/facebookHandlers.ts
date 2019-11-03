import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { OnError, SetLoading } from './types/SocialLoginProps';
import client from '../../../http/client';
import ResponseResult from '../../../../src/types/ResponseResult';
import User from '../../../../src/modules/users/types/User';
import { Routes } from '../../../http/types/Routes';
import { SetCurrentUser } from '../../../redux/actions/user/types/UserActions';
import { Dispatch } from 'redux';

export const onSuccess = ( setLoading: SetLoading, dispatch: Dispatch, onError: OnError ) => async ( { accessToken }: ReactFacebookLoginInfo ) =>
{
    try {
        const { data } = await client.post<ResponseResult<User>>( Routes.facebookLogin, { token: accessToken } );

        if ( !data.result ) {
            onError( 'Invalid response received from server.' );
        } else {
            dispatch<SetCurrentUser>( {
                type: 'SetCurrentUser',
                payload: data.result,
            } );
        }
    } catch ( e ) {
        const { response } = e;

        onError( response.data.message );
    } finally {
        setLoading( false );
    }
};