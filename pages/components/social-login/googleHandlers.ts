import { GoogleLoginResponseOffline } from 'react-google-login';
import { SetLoading } from './types/SocialLoginProps';
import GoogleError from './types/GoogleError';

export const onSuccess = ( setLoading: SetLoading ) => async ( response: GoogleLoginResponseOffline ) =>
{
    setLoading( false );
    console.log( { response } );
};

export const onError = ( setLoading: SetLoading ) => ( { error = '' }: GoogleError ) =>
{
    setLoading( false );

    if ( error === 'popup_closed_by_user' ) {
        return;
    }
};
