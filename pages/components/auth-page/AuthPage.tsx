import * as React from 'react';
import { FC } from 'react';
import { Card, CardContent, Container, Grid, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons';
import AuthPageProps from './interfaces/auth-page-props.interface';
import AuthContainerProps from './interfaces/auth-container-props.interface';

const AuthContainer = styled( Container )<AuthContainerProps>`
    height: 100vh;
    background: url(${ props => props.backgroundUrl }) center;
    background-size: cover;
    
    .grid-container {
        height: 100%;
    }
    
    .card {
        max-width: 375px;
        margin: 0 auto;
    }
`;

const AuthPage: FC<AuthPageProps> = ( { children, title, returnUrl, backgroundUrl } ) =>
{
    return (
        <AuthContainer backgroundUrl={ backgroundUrl } className="auth-container" maxWidth={ false }>
            <Grid className="grid-container" container alignItems="center" justify="center">
                <Grid item>
                    <Card className="card">
                        <CardContent>
                            <Grid className="card-header" alignItems="center" container>
                                <IconButton className="return-link" href={ returnUrl } size="small">
                                    <ArrowBack/>
                                </IconButton>
                                <Typography className="card-title" variant="h5">
                                    { title }
                                </Typography>
                            </Grid>
                            { children }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AuthContainer>
    );
};

export default AuthPage;
