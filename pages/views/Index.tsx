import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from './components/AppHead/AppHead';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

const Index: NextPage<any> = ( { title } ) =>
{
    return (
        <Container fixed>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5">
                        { title }
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppHead title={ title }/>
            Welcome on { title }!
        </Container>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
