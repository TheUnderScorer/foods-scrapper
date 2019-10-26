import { NextPage } from 'next';
import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import AuthPage from '../components/auth-page/AuthPage';
import RegisterForm from '../components/register-form/RegisterForm';

const register: NextPage<any> = () =>
{
    return (
        <>
            <AppHead title="Register"/>
            <AuthPage returnUrl="/auth/login" title="Register">
                <RegisterForm/>
            </AuthPage>
        </>
    );
};

export default register;
