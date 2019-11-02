import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import LoginForm from '../components/login-form/LoginForm';
import { NextPage } from 'next';
import CardPage from '../components/card-page/CardPage';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';

const Login: NextPage<any> = () => {
    useNotLoggedGuard();

    return (
        <>
            <AppHead title="Login"/>
            <CardPage title="Login" returnUrl="/" backgroundUrl="/static/landscape.jpg">
                <LoginForm/>
            </CardPage>
        </>
    );
};

export default Login;
