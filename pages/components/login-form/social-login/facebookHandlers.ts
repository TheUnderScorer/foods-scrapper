import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { SetLoading } from './types/SocialLoginProps';
import { Dispatch } from 'redux';

export const onSuccess = ( setLoading: SetLoading, dispatch: Dispatch ) => async ( response: ReactFacebookLoginInfo ) =>
{
    console.log( { response } );

    setLoading( false );
};