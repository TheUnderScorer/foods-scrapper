import * as React from 'react';
import { FC } from 'react';
import AppHead from '../components/app-head/AppHead';
import { Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import LoginForm from '../components/login-form/LoginForm';
import styled from 'styled-components';
import GlobalStyle from '../components/global-style/GlobalStyle';

const LoginContainer = styled( Container )`
    height: 100vh;
    background: url(/static/landscape.jpg) center;
    background-size: cover;
    
    .grid-container {
        height: 100%;
    }
    
    .title {
        margin-bottom: 2rem;
    }
    
    .card {
        max-width: 450px;
        margin: 0 auto;
    }
`;

const Login: FC = () =>
{
    return (
        <main>
            <GlobalStyle/>
            <AppHead title="Login"/>
            <LoginContainer maxWidth={ false }>
                <Grid className="grid-container" container alignItems="center" justify="center">
                    <Grid item xs={ 4 }>
                        <Card className="card">
                            <CardContent>
                                <Typography className="title" align="center" variant="h5">
                                    Login!
                                </Typography>
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
