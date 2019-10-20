import * as React from 'react';
import AppHead from '../components/app-head/app-head';
import LoginForm from '../components/login-form/login-form';
import GlobalStyle from '../components/global-style/global-style';
import { NextPage } from 'next';
import AuthPage from '../components/auth-page/auth-page';

const Login: NextPage<any> = () =>
{
    return (
        <main>
            <GlobalStyle/>
            <AppHead title="Login"/>
            <AuthPage title="Login" returnUrl="/" backgroundUrl="/static/landscape.jpg">
                <LoginForm/>
            </AuthPage>
        </main>
    );
};

export default Login;
