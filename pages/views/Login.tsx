import * as React from 'react';
import AppHead from '../components/app-head/AppHead';
import { Card, CardContent, Container, Grid, IconButton, Typography } from '@material-ui/core';
import LoginForm from '../components/login-form/LoginForm';
import styled from 'styled-components';
import GlobalStyle from '../components/global-style/GlobalStyle';
import { ArrowBack } from '@material-ui/icons';
import { NextPage } from 'next';

const LoginContainer = styled( Container )`
    height: 100vh;
    background: url(/static/landscape.jpg) center;
    background-size: cover;
    
    .grid-container {
        height: 100%;
    }
    
    .card {
        max-width: 375px;
        margin: 0 auto;
    }
`;

const Login: NextPage<any> = () =>
{
    return (
        <main>
            <GlobalStyle/>
            <AppHead title="Login"/>
            <LoginContainer maxWidth={ false }>
                <Grid className="grid-container" container alignItems="center" justify="center">
                    <Grid item>
                        <Card className="card">
                            <CardContent>
                                <Grid className="card-header" alignItems="center" container>
                                    <IconButton href="/" size="small">
                                        <ArrowBack/>
                                    </IconButton>
                                    <Typography className="card-title" variant="h5">
                                        Login
                                    </Typography>
                                </Grid>
                                <LoginForm/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </LoginContainer>
        </main>
    );
};

export default Login;
