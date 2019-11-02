import { NextPage } from 'next';
import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import CardPage from '../components/card-page/CardPage';
import RegisterForm from '../components/register-form/RegisterForm';
import useNotLoggedGuard from '../hooks/useNotLoggedGuard';

const register: NextPage<any> = () => {
    useNotLoggedGuard();

    return (
        <>
            <AppHead title="Register"/>
            <CardPage returnUrl="/auth/login" title="Register">
                <RegisterForm/>
            </CardPage>
        </>
    );
};

export default register;
