import { NextPage } from 'next';
import * as React from 'react';
import GlobalStyle from '../components/global-style/global-style';
import AppHead from '../components/app-head/app-head';
import AuthPage from '../components/auth-page/auth-page';

const register: NextPage<any> = () =>
{
    return (
        <>
            <GlobalStyle/>
            <AppHead title="Register"/>
            <AuthPage returnUrl="/auth/login" title="Register">
                Register!
            </AuthPage>
        </>
    );
};

export default register;
