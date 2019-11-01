import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import { Container } from '@material-ui/core';
import useAuthGuard from '../hooks/useAuthGuard';
import Header from '../components/header/Header';

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
    useAuthGuard();

    return (
        <>
            <AppHead title={ title }/>
            <Header title={ title }/>
            <Container fixed>
                Welcome on { title }!
            </Container>
        </>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
