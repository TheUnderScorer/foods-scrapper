import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { FormikProps, withFormik } from 'formik';
import RegisterFormProps from './interfaces/register-form-props.interface';
import RegisterInput from './interfaces/register-input.interface';
import { AuthForm } from '../auth-page/styled';
import { Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { ErrorBox } from '../styled/boxes';
import { Email, Lock } from '@material-ui/icons';
import { getInputError } from '../../formik/errors';
import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import buildHttpHandler from '../../formik/build-http-handler';
import { Result } from '../../../src/interfaces/response.interface';
import RegisterResult from '../../../src/modules/auth/interfaces/register-result.interface';
import client from '../../http/client';
import redirect from '../../http/redirect';
import RegisterSuccessDialog from './register-success-dialog';

const validationSchema = Yup.object().shape<RegisterInput>( {
    email:          Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
    password:       Yup.string().required( 'Provide password.' ),
    passwordRepeat: Yup.string().required( 'Repeat your password.' ),
} );

const RegisterForm: FC<FormikProps<RegisterInput> & RegisterFormProps> = ( props ) =>
{
    const {
              handleBlur,
              handleSubmit,
              error,
              touched,
              errors,
              handleChange,
              isSubmitting,
              status,
          } = props;
    const getError = getInputError<RegisterInput>( touched, errors );

    const [ dialogVisible, setDialogVisible ] = useState( false );

    useEffect( () =>
    {
        setDialogVisible( status );
    }, [ status ] );

    return (
        <AuthForm className="container" action="#" onSubmit={ handleSubmit }>
            <RegisterSuccessDialog visible={ dialogVisible }/>
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
                        helperText={ getError( 'passwordRepeat' ) }
                        error={ !!getError( 'passwordRepeat' ) }
                        onChange={ handleChange }
                        fullWidth
                        label="Repeat password"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type="password"/>
                </Grid>
                <Grid className="form-item button-container" item xs={ 10 }>
                    <Button variant="contained" className="submit-button" disabled={ !isEmpty( errors ) || isSubmitting } type="submit" color="primary">
                        { isSubmitting ?
                            <>
                                <CircularProgress size={ 30 }/>
                                <span className="loader-label">
                                    Registering...
                                </span>
                            </> :
                            'Register' }
                    </Button>
                </Grid>
                <Grid className="register-container" container alignItems="center" justify="center">
                    <Typography variant="subtitle2">
                        {/* eslint-disable-next-line react/no-unescaped-entities */ }
                        Already have account?
                    </Typography>
                    <Button href="/auth/login">
                        Login
                    </Button>
                </Grid>
            </Grid>
        </AuthForm>
    );
};

const formikWrapper = withFormik<RegisterFormProps, RegisterInput>( {
    mapPropsToValues: () => ( {
        password:       '',
        email:          '',
        passwordRepeat: '',
    } ),
    validationSchema,
    validate:         ( { passwordRepeat, password } ) =>
                      {
                          const errors: any = {};

                          if ( passwordRepeat && password && passwordRepeat !== password ) {
                              errors.passwordRepeat = 'Password are not equal.';
                          }

                          return errors;
                      },
    handleSubmit:     async ( { email, password }, { setSubmitting, setError, setStatus, props: { redirectUrl, onSubmit }, resetForm } ) =>
                      {
                          setError( '' );

                          const requestHandler = buildHttpHandler<Result<RegisterResult>>( setError );
                          const { response, isEmpty } = await requestHandler( () => client.post( '/auth/register', { email, password } ) );

                          if ( !isEmpty() ) {
                              const { jwt, user } = response.data.result;

                              resetForm();

                              setStatus( true );

                              if ( onSubmit ) {
                                  onSubmit( jwt, user );
                              }

                              if ( redirectUrl ) {
                                  redirect( redirectUrl );
                              }
                          }

                          setSubmitting( false );
                      },
} );

export default formikWrapper( RegisterForm );
