import * as React from 'react';
import { FC, useCallback, useState } from 'react';
import { FormikProps, withFormik } from 'formik';
import { Button, CircularProgress, Divider, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import client from '../../http/client';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { getInputError } from '../../formik/errors';
import buildHttpHandler from '../../formik/buildHttpHandler';
import ResponseResult from '../../../src/types/ResponseResult';
import RegisterResult from '../../../src/modules/auth/types/RegisterResult';
import LoginFormProps from './types/LoginFormProps';
import { Email, Lock } from '@material-ui/icons';
import { AuthForm } from '../card-page/styled';
import redirect from '../../http/redirect';
import FormikStatus from '../../types/formik/FormikStatus';
import getDefaultStatus from '../../formik/getDefaultStatus';
import PasswordResetDialog from './password-reset-dialog/PasswordResetDialog';
import UserDto from '../../../src/modules/auth/dto/UserDto';
import { Routes } from '../../http/types/Routes';
import Notice from '../notice/Notice';
import SocialLogin from './social-login/SocialLogin';
import styled from 'styled-components';

const validationSchema = Yup.object().shape<UserDto>( {
    email: Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
    password: Yup.string().required( 'Provide password.' ),
} );

const SocialDividerContainer = styled.div`
    position: relative;
    text-align: center;

    .divider {
      margin-bottom: 1.4rem !important;
      margin-top: 1rem !important;
    }
    
    .text {
      position: absolute;
      bottom: -10px;
      background-color: ${ props => props.theme.palette.background.default }
    }
`;

const LoginForm: FC<FormikProps<UserDto> & LoginFormProps> = ( {
    handleSubmit,
    setStatus,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
    values,
    ...props
} ) =>
{
    const status = props.status as FormikStatus;

    const getError = getInputError<UserDto>( touched, errors );

    const [ isResetPasswordVisible, setPasswordResetVisible ] = useState( false );
    const closeResetPassword = useCallback( () => setPasswordResetVisible( false ), [] );
    const openClosePassword = useCallback( () => setPasswordResetVisible( true ), [] );

    const onSocialLoadingChange = useCallback( ( loading: boolean ) =>
    {
        setSubmitting( loading );
    }, [] );

    const onSocialLoginError = useCallback( ( error: string ) =>
    {
        const status: FormikStatus = {
            error: true,
            message: error,
        };

        setStatus( status );
    }, [] );

    return (
        <>
            <AuthForm className="container" action="#" onSubmit={ handleSubmit }>
                <Grid justify="center" container>
                    { status && status.error &&
                    <Notice item xs={ 10 } type="error">
                        { status.message }
                    </Notice>
                    }
                    { status && status.result &&
                    <Notice item xs={ 10 } type="success">
                        { status.message }
                    </Notice>
                    }
                    <Grid item xs={ 10 }>
                        <TextField
                            disabled={ isSubmitting }
                            autoComplete="off"
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
                            value={ values.email }
                            fullWidth
                            label="Email"
                            name="email"
                            id="email"/>
                    </Grid>
                    <Grid className="form-item" item xs={ 10 }>
                        <TextField
                            disabled={ isSubmitting }
                            autoComplete="off"
                            variant="outlined"
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                ),
                            } }
                            value={ values.password }
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
                        <Button variant="contained" className="submit-button"
                                disabled={ !isEmpty( errors ) || isSubmitting } type="submit" color="primary">
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
                        <Button disabled={ isSubmitting } href="/auth/register">
                            Register
                        </Button>
                    </Grid>
                    <Grid alignItems="center" justify="center" container>
                        <Button disabled={ isSubmitting } className="forgot-password-btn" onClick={ openClosePassword }>
                            Forgot password?
                        </Button>
                    </Grid>
                </Grid>
            </AuthForm>
            <SocialDividerContainer>
                <Typography variant="caption" className="text">
                    OR
                </Typography>
                <Divider className="divider" variant="fullWidth"/>
            </SocialDividerContainer>
            <Grid container>
                <SocialLogin onError={ onSocialLoginError } disabled={ isSubmitting }
                             onLoadingChange={ onSocialLoadingChange } googleID={ process.env.GOOGLE_ID }/>
            </Grid>
            <PasswordResetDialog isOpen={ isResetPasswordVisible } onClose={ closeResetPassword }/>
        </>
    );
};

const formikWrapper = withFormik<LoginFormProps, UserDto>( {
    mapPropsToValues: ( { defaults } ) => ({
        email: defaults ? defaults.email : '',
        password: defaults ? defaults.password : '',
    }),
    validationSchema,
    handleSubmit: async ( values, { setSubmitting, setStatus, props, resetForm } ) =>
    {
        setStatus( getDefaultStatus() );

        const requestHandler = buildHttpHandler<ResponseResult<RegisterResult>>( setStatus );
        const { response, isEmpty } = await requestHandler( () => client.post( Routes.login, { ...values } ) );

        if ( !isEmpty() ) {
            const { data } = response;

            if ( props.onSubmit ) {
                props.onSubmit( data.result.user, data.result.jwt );
            }

            const status: FormikStatus = {
                message: 'You have logged in.',
                result: true,
            };

            resetForm();

            setStatus( status );

            setTimeout( () => redirect( '/' ), 300 );
        }

        setSubmitting( false );
    },
} );

export default formikWrapper( LoginForm );
