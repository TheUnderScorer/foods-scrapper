import * as React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import SocialLoginProps from './types/SocialLoginProps';
import { Button, Grid } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { onError, onSuccess } from './googleHandlers';

const SocialLogin: FC<SocialLoginProps> = ( { googleID, onLoadingChange, disabled } ) =>
{
    const [ loading, setLoading ] = useState( false );

    const onGoogleRequest = useCallback( () => setLoading( true ), [] );

    useEffect( () =>
    {
        if ( onLoadingChange ) {
            onLoadingChange( loading );
        }
    }, [ loading ] );

    return (
        <Grid container>
            { !!googleID &&
              <Grid item xs={ 12 }>
                  <GoogleLogin
                      onRequest={ onGoogleRequest }
                      render={ props => (
                          <Button id="google_login" fullWidth { ...props } disabled={ disabled || props.disabled } variant="outlined">
                              Continue with Google
                          </Button>
                      ) }
                      clientId={ googleID }
                      responseType="code"
                      onSuccess={ onSuccess( setLoading ) }
                      onFailure={ onError( setLoading ) }
                  />
              </Grid>
            }
        </Grid>
    );
};

export default SocialLogin;
