import * as React from 'react';
import { FormikProps, withFormik } from 'formik';
import LoginInput from './interfaces/login-input.interface';
import { Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import client from '../../http/client';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { getInputError } from '../../formik/errors';
import buildHttpHandler from '../../formik/buildHttpHandler';
import { Result } from '../../../src/interfaces/response.interface';
import RegisterResult from '../../../src/modules/auth/interfaces/register-result.interface';
import LoginFormProps from './interfaces/LoginFormProps';
import { Email, Lock } from '@material-ui/icons';

const Form = styled.form`
    min-height: 300px;
    display: flex;
    align-items: center;

    .form-item {
        margin-top: 2rem;
    }
    
    .button-container {
        text-align: center;
    }
   
    .submit-button {
        width: 100%;
    }
    
    .register-container {
        margin-top: 1rem;
    }
    
    .loader-label {
        margin-left: 1rem;
    }
`;

const ErrorBox = styled( Grid )`
        background: ${ props => props.theme.palette.error.main };
        padding: 1rem;
        margin-bottom: 2rem !important;
        
        * {
            color: ${ props => props.theme.palette.common.white }
        }
`;

const validationSchema = Yup.object().shape<LoginInput>( {
    email:    Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
    password: Yup.string().required( 'Provide password.' ),
} );

const LoginForm = ( { handleSubmit, errors, touched, handleChange, handleBlur, error, isSubmitting, setSubmitting }: FormikProps<LoginInput> & LoginFormProps ) =>
{
    const getError = getInputError<LoginInput>( touched, errors );

    return (
        <Form className="container" action="#" onSubmit={ handleSubmit }>
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
                                    Submitting...
                                </span>
                            </> :
                            'Submit' }
                    </Button>
                </Grid>
                <Grid className="register-container" container alignItems="center" justify="center">
                    <Typography variant="subtitle2">
                        Do not have account?
                    </Typography>
                    <Button href="/auth/register">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Form>
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
                          const { data } = await requestHandler( () => client.post( '/auth/login', { ...values } ) );

                          if ( data.result && data.result.user && props.onSubmit ) {
                              props.onSubmit( data.result.user, data.result.jwt );

                              await props.router.push( '/' );
                          }

                          setSubmitting( false );
                      },
} );

export default formikWrapper( LoginForm );
