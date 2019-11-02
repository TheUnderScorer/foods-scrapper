import * as React from 'react';
import { NextPage } from 'next';
import { Routes } from '../http/types/Routes';
import CardPage from '../components/card-page/CardPage';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';
import ResetPasswordForm from '../components/reset-password-form/ResetPasswordForm';
import Notice from '../components/notice/Notice';

export interface ResetPasswordProps
{
    query?: URLSearchParams;
}

const ResetPassword: NextPage<ResetPasswordProps> = ( { query = new URLSearchParams( process.browser ? location.search : '' ) } ) => {
    useNotLoggedGuard();

    return (
        <CardPage cardWidth="350px" title="Reset password" returnUrl={ Routes.login }>
            { !query.has( 'token' ) && process.browser &&
            <Notice type="error" className="error">
                Error: No reset password token provided.
            </Notice>
            }
            { query.has( 'token' ) && <ResetPasswordForm defaults={ { token: query.get( 'token' ), password: '' } }/> }
        </CardPage>
    );
};

export default ResetPassword;
