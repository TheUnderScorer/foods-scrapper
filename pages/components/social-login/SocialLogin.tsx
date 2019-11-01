import * as React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import SocialLoginProps from './types/SocialLoginProps';
import { Button, Grid } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { onError as onGoogleError, onSuccess } from './googleHandlers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';

const SocialLogin: FC<SocialLoginProps> = ( { googleID, onLoadingChange, disabled, onError } ) =>
{
    const dispatch = useDispatch();

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
                          <Button className="btn-with-icon" id="google_login" fullWidth { ...props } disabled={ disabled || props.disabled } variant="outlined">
                              <FontAwesomeIcon className="btn-icon" icon={ faGoogle }/>
                              <span>
                                  Continue with Google
                            </span>
                          </Button>
                      ) }
                      clientId={ googleID }
                      responseType="code"
                      onSuccess={ onSuccess( setLoading, dispatch, onError ) }
                      onFailure={ onGoogleError( setLoading, onError ) }
                  />
              </Grid>
            }
        </Grid>
    );
};

export default SocialLogin;
