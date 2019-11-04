import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import useAuthGuard from '../hooks/useAuthGuard';
import Header from '../components/header/Header';
import CardPage from '../components/card-page/CardPage';

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
    useAuthGuard();

    return (
        <>
            <AppHead title={ title }/>
            <Header title={ title }/>
            <CardPage>
                Welcome on { title }!
            </CardPage>
        </>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
