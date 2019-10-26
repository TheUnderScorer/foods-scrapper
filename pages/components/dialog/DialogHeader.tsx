import * as React from 'react';
import { FC, ReactNode } from 'react';
import { DialogTitle, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

export interface DialogTitleProps
{
    icon?: ReactNode | string;
}

const Container = styled( DialogTitle )`
    .title-with-icon {
        margin-left: 0.5rem;
    }
`;

const DialogHeader: FC<DialogTitleProps> = ( { children, icon } ) =>
{
    return (
        <Container>
            <Grid alignItems="center" container>
                { icon }
                <Typography className={ !!icon ? 'title-with-icon' : 'dialog-title' } variant="h6">
                    { children }
                </Typography>
            </Grid>
        </Container>
    );
};

export default DialogHeader;
