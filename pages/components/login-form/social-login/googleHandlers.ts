import { GoogleLoginResponseOffline } from 'react-google-login';
import { OnError, SetLoading } from './types/SocialLoginProps';
import GoogleError from './types/GoogleError';
import client from '../../../http/client';
import { Routes } from '../../../http/types/Routes';
import ResponseResult from '../../../../src/types/ResponseResult';
import User from '../../../../src/modules/users/types/User';
import { Dispatch } from 'redux';
import { SetCurrentUser } from '../../../redux/actions/user/types/UserActions';

export const onSuccess = ( setLoading: SetLoading, dispatch: Dispatch, onError: OnError ) => async ( { code }: GoogleLoginResponseOffline ) =>
{
    try {
        const { data } = await client.get<ResponseResult<User>>( `${ Routes.googleLogin }`, {
            params: { code },
        } );

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

export const onError = ( setLoading: SetLoading, onError: OnError ) => ( { error = '' }: GoogleError ) =>
{
    setLoading( false );

    if ( error === 'popup_closed_by_user' ) {
        return;
    }

    onError( error );
};
