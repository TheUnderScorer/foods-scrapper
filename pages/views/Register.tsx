import { NextPage } from 'next';
import * as React from 'react';
import GlobalStyle from '../components/global-style/GlobalStyle';
import AppHead from '../components/app-head/AppHead';
import AuthPage from '../components/auth-page/AuthPage';
import RegisterForm from '../components/register-form/RegisterForm';

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
