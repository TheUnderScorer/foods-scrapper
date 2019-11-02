import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import LoginForm from '../components/login-form/LoginForm';
import { NextPage } from 'next';
import AuthPage from '../components/auth-page/AuthPage';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';

const Login: NextPage<any> = () => {
    useNotLoggedGuard();

    return (
        <>
            <AppHead title="Login"/>
            <AuthPage title="Login" returnUrl="/" backgroundUrl="/static/landscape.jpg">
                <LoginForm/>
            </AuthPage>
        </>
    );
};

export default Login;
