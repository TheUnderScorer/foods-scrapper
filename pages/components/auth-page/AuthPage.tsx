import * as React from 'react';
import { FC } from 'react';
import { Card, CardContent, Container, Grid, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons';
import AuthPageProps from './types/AuthPageProps';
import AuthContainerProps from './types/AuthContainerProps';

const AuthContainer = styled( Container )<AuthContainerProps>`
    height: 100vh;
    background: url(${ props => props.backgroundUrl }) center;
    background-size: cover;
    
    .grid-container {
        height: 100%;
    }
    
    .card {
        width: ${ ( { cardWidth = 'auto' } ) => cardWidth }
        max-width: ${ ( { cardMaxWidth = '400px' } ) => cardMaxWidth };
        margin: 0 auto;
    }
`;

const AuthPage: FC<AuthPageProps> = ( { children, title, returnUrl, backgroundUrl = '', cardMaxWidth, cardWidth } ) =>
{
    return (
        <AuthContainer cardWidth={ cardWidth } cardMaxWidth={ cardMaxWidth } backgroundUrl={ backgroundUrl } className="auth-container" maxWidth={ false }>
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
