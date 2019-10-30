import * as React from 'react';
import { lazy, Suspense } from 'react';
import { NextPage } from 'next';
import { Routes } from '../http/types/Routes';
import AuthPage from '../components/auth-page/AuthPage';
import { CircularProgress, Typography } from '@material-ui/core';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';

const ResetPasswordForm = lazy( () => import('../components/reset-password-form/ResetPasswordForm') );

export interface ResetPasswordProps
{
    query?: URLSearchParams;
}

const ResetPassword: NextPage<ResetPasswordProps> = ( { query = new URLSearchParams( process.browser ? location.search : '' ) } ) =>
{
    useNotLoggedGuard();

    return (
        <AuthPage title="Reset password" returnUrl={ Routes.login }>
            { !query.has( 'token' ) && process.browser &&
              <Typography className="error" color="error">
                  Error: No reset password token provided.
              </Typography>
            }
            <Suspense fallback={ <CircularProgress size={ 30 }/> }>
                { query.has( 'token' ) && <ResetPasswordForm defaults={ { token: query.get( 'token' ), password: '' } }/> }
            </Suspense>
        </AuthPage>
    );
};

export default ResetPassword;
