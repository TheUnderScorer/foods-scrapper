import { GoogleLoginResponseOffline } from 'react-google-login';
import { onError, onSuccess } from './googleHandlers';
import GoogleError from './types/GoogleError';

describe( 'googleHandlers', () =>
{
    it( 'onSuccess', async () =>
    {
        const setLoading = jest.fn();
        const response: GoogleLoginResponseOffline = {
            code: 'CODE',
        };

        await onSuccess( setLoading )( response );

        expect( setLoading ).toBeCalledWith( false );
    } );

    it( 'onError', async () =>
    {
        const setLoading = jest.fn();
        const error: GoogleError = {
            error: 'ERROR',
        };

        await onError( setLoading )( error );

        expect( setLoading ).toBeCalledWith( false );
    } );
} );
