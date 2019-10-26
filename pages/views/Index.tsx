import * as React from 'react';
import { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/app-head/AppHead';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import useCurrentUser from '../hooks/useCurrentUser';
import { isEmpty } from 'lodash';
import redirect from '../http/redirect';

const Index: NextPage<any> = ( { title = 'Foods scrapper' } ) =>
{
    const [ { loading, data, error } ] = useCurrentUser();

    useEffect( () =>
    {
        if ( !loading ) {
            if ( isEmpty( data ) || !isEmpty( error ) ) {
                redirect( '/auth/login' );
            }
        }
    }, [ loading, data, error ] );

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
