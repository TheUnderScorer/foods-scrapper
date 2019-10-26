import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
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
