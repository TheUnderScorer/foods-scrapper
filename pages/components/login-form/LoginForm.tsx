import * as React from 'react';
import { FormikProps, withFormik } from 'formik';
import LoginInput from './types/LoginInput';
import { Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import client from '../../http/client';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { getInputError } from '../../formik/errors';
import buildHttpHandler from '../../formik/buildHttpHandler';
import { Result } from '../../../src/interfaces/response.interface';
import RegisterResult from '../../../src/modules/auth/interfaces/register-result.interface';
import LoginFormProps from './types/LoginFormProps';
import { Email, Lock } from '@material-ui/icons';
import { AuthForm } from '../auth-page/styled';
import { ErrorBox } from '../styled/boxes';
import redirect from '../../http/redirect';

const validationSchema = Yup.object().shape<LoginInput>( {
    email:    Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
    password: Yup.string().required( 'Provide password.' ),
} );

// TODO Tests
const LoginForm = ( { handleSubmit, errors, touched, handleChange, handleBlur, error, isSubmitting }: FormikProps<LoginInput> & LoginFormProps ) =>
{
    const getError = getInputError<LoginInput>( touched, errors );

    return (
        <AuthForm className="container" action="#" onSubmit={ handleSubmit }>
            <Grid justify="center" container>
                { error &&
                  <ErrorBox item xs={ 10 } className="error-box">
                      <Typography variant="body2">
                          { error }
                      </Typography>
                  </ErrorBox>
                }
                <Grid item xs={ 10 }>
                    <TextField
                        variant="outlined"
                        InputProps={ {
                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email/>
                                                </InputAdornment>
                                            ),
                        } }
                        onBlur={ handleBlur }
                        helperText={ getError( 'email' ) }
                        error={ !!getError( 'email' ) }
                        onChange={ handleChange }
                        fullWidth
                        label="Email"
                        name="email"
                        id="email"/>
                </Grid>
                <Grid className="form-item" item xs={ 10 }>
                    <TextField
                        variant="outlined"
                        InputProps={ {
                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock/>
                                                </InputAdornment>
                                            ),
                        } }
                        onBlur={ handleBlur }
                        helperText={ getError( 'password' ) }
                        error={ !!getError( 'password' ) }
                        onChange={ handleChange }
                        fullWidth
                        label="Password"
                        id="password"
                        name="password"
                        type="password"/>
                </Grid>
                <Grid className="form-item button-container" item xs={ 10 }>
                    <Button variant="contained" className="submit-button" disabled={ !isEmpty( errors ) || isSubmitting } type="submit" color="primary">
                        { isSubmitting ?
                            <>
                                <CircularProgress size={ 30 }/>
                                <span className="loader-label">
                                    Logging in...
                                </span>
                            </> :
                            'Login' }
                    </Button>
                </Grid>
                <Grid className="register-container" container alignItems="center" justify="center">
                    <Typography variant="subtitle2">
                        {/* eslint-disable-next-line react/no-unescaped-entities */ }
                        Don't have account?
                    </Typography>
                    <Button href="/auth/register">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </AuthForm>
    );
};

const formikWrapper = withFormik<LoginFormProps, LoginInput>( {
    mapPropsToValues: () => ( {
        email:    '',
        password: '',
    } ),
    validationSchema,
    handleSubmit:     async ( values, { setSubmitting, setError, props } ) =>
                      {
                          setError( '' );

                          const requestHandler = buildHttpHandler<Result<RegisterResult>>( setError );
                          const { response, isEmpty } = await requestHandler( () => client.post( '/auth/login', { ...values } ) );

                          if ( !isEmpty() ) {
                              const { data } = response;

                              if ( props.onSubmit ) {
                                  props.onSubmit( data.result.user, data.result.jwt );
                              }

                              redirect( '/' );
                          }

                          setSubmitting( false );
                      },
} );

export default formikWrapper( LoginForm );
