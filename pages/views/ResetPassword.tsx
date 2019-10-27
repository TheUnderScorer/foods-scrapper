import * as React from 'react';
import { NextPage } from 'next';
import { Routes } from '../http/types/Routes';
import AuthPage from '../components/auth-page/AuthPage';
import ResetPasswordForm from '../components/reset-password-form/ResetPasswordForm';
import { Typography } from '@material-ui/core';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';

// TODO Tests
const ResetPassword: NextPage = () =>
{
    useNotLoggedGuard();

    const query = new URLSearchParams( process.browser ? location.search : '' );

    return (
        <AuthPage title="Reset password" returnUrl={ Routes.login }>
            { !query.has( 'token' ) && process.browser &&
              <Typography className="error" color="error">
                  Error: No reset password token provided.
              </Typography>
            }
            { query.has( 'token' ) && <ResetPasswordForm defaults={ { token: query.get( 'token' ), password: '' } }/> }
        </AuthPage>
    );
};

export default ResetPassword;
