import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from './components/AppHead/AppHead';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

const Index: NextPage<any> = ( { title } ) =>
{
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    );
};

Index.getInitialProps = async ( ctx: NextPageContext ) =>
{
    const { query } = ctx;

    return { ...query };
};

export default Index;
