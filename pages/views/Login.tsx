import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import LoginForm from '../components/login-form/LoginForm';
import GlobalStyle from '../components/global-style/GlobalStyle';
import { NextPage } from 'next';
import AuthPage from '../components/auth-page/AuthPage';

const Login: NextPage<any> = () =>
{
    return (
        <>
            <GlobalStyle/>
            <AppHead title="Login"/>
            <AuthPage title="Login" returnUrl="/" backgroundUrl="/static/landscape.jpg">
                <LoginForm/>
            </AuthPage>
        </>
    );
};

export default Login;
