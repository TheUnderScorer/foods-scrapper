import * as React from 'react';
import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import useAuthGuard from '../hooks/useAuthGuard';
import { useDispatch } from 'react-redux';
import fetchCurrentUser from '../redux/actions/user/fetchCurrentUser';

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
    const dispatch = useDispatch();

    useAuthGuard();

    useEffect( () =>
    {
        dispatch( fetchCurrentUser() );
    }, [] );

    return (
        <>
            <AppHead title={ title }/>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h5">
                        { title }
                    </Typography>
                </Toolbar>
            </AppBar>
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
