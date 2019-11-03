import * as React from 'react';
import { FC, useCallback, useEffect, useState } from 'react';
import SocialLoginProps from './types/SocialLoginProps';
import { Button, Grid } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { onError as onGoogleError, onSuccess as onGoogleSuccess } from './googleHandlers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { blue } from '@material-ui/core/colors';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { onSuccess as onFacebookSuccess } from './facebookHandlers';

const SocialLoginContainer = styled( Grid )`
  > div:not(:first-child) {
    margin-top: 1rem;
  }
  
  #facebook_login {
    color: ${ blue.A400 }
  }
`;

const SocialLogin: FC<SocialLoginProps> = ( { googleID, onLoadingChange, disabled, onError, facebookID } ) =>
{
    const dispatch = useDispatch();

    const [ didFbInit, setDidFbInit ] = useState( false );
    const [ loading, setLoading ] = useState( false );

    const onGoogleRequest = useCallback( () => setLoading( true ), [] );
    const onFacebookClick = useCallback( ( onClick: () => any ) => () =>
    {
        console.log( 'Facebook btn clicked' );

        if ( !didFbInit ) {
            window.FB.init( {
                appId: facebookID,
                version: 'v3.1',
            } );

            setDidFbInit( true );
        }

        setLoading( true );

        onClick();
    }, [ facebookID, didFbInit ] );

    useEffect( () =>
    {
        if ( onLoadingChange ) {
            onLoadingChange( loading );
        }
    }, [ loading ] );

    return (
        <SocialLoginContainer container>
            { !!googleID &&
            <Grid item xs={ 12 }>
                <GoogleLogin
                    onRequest={ onGoogleRequest }
                    render={ props => (
                        <Button
                            className="btn-with-icon"
                            id="google_login"
                            fullWidth
                            disabled={ disabled || props.disabled || loading }
                            variant="outlined"
                            { ...props }
                        >
                            <FontAwesomeIcon className="btn-icon" icon={ faGoogle }/>
                            <span>
                                  Continue with Google
                            </span>
                        </Button>
                    ) }
                    clientId={ googleID }
                    responseType="code"
                    onSuccess={ onGoogleSuccess( setLoading, dispatch, onError ) }
                    onFailure={ onGoogleError( setLoading, onError ) }
                />
            </Grid>
            }
            { !!facebookID &&
            <Grid item xs={ 12 }>
                <FacebookLogin
                    responseType="code"
                    appId={ facebookID }
                    callback={ onFacebookSuccess( setLoading, dispatch, onError ) }
                    render={ ( props: any ) =>
                        <Button
                            onClick={ onFacebookClick( props.onClick ) }
                            className="btn-with-icon"
                            id="facebook_login"
                            fullWidth
                            disabled={ disabled || props.isDisabled || loading }
                            variant="outlined">
                            <FontAwesomeIcon className="btn-icon" icon={ faFacebook }/>
                            <span>
                                Continue with Facebook
                            </span>
                        </Button>
                    }


                />
            </Grid>
            }
        </SocialLoginContainer>
    );
};

export default SocialLogin;
