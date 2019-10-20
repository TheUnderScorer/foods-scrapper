import { NextPage } from 'next';
import * as React from 'react';
import GlobalStyle from '../components/global-style/global-style';
import AppHead from '../components/app-head/app-head';
import AuthPage from '../components/auth-page/auth-page';
import RegisterForm from '../components/register-form/register-form';

const register: NextPage<any> = () =>
{
    return (
        <>
            <GlobalStyle/>
            <AppHead title="Register"/>
            <AuthPage returnUrl="/auth/login" title="Register">
                <RegisterForm/>
            </AuthPage>
        </>
    );
};

export default register;
