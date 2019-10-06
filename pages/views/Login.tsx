import * as React from 'react';
import { FC } from 'react';
import { NextPage } from 'next';
import ThemeProvider from '../components/theme-provider/ThemeProvider';
import AppHead from '../components/app-head/AppHead';
import { Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( {
    container:     {
        height:             '100vh',
        background:         `url(/static/landscape.jpg)`,
        backgroundPosition: 'center',
        backgroundSize:     'cover',
    },
    gridContainer: {
        height: '100%',
    },
} );

const Login: FC = () =>
{
    const styles = useStyles( {} );
    return (
        <>
            <main>
                <style jsx global>{ `
                body {
                    margin: 0;
                }
            ` }</style>
                <AppHead title="Login"/>
                <Container className={ `${ styles.container } container` } maxWidth={ false }>
                    <Grid className={ styles.gridContainer } container alignItems="center" justify="center">
                        <Grid item xs={ 6 }>
                            <Card>
                                <CardContent>
                                    <Typography align="center" variant="h5">
                                        Login
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    );
};

const LoginPage: NextPage<any> = () =>
{
    return (
        <ThemeProvider>
            <Login/>
        </ThemeProvider>
    );
};

export default LoginPage;
