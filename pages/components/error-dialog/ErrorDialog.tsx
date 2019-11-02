import * as React from 'react';
import { useSelector } from 'react-redux';
import AppStore from '../../redux/stores/types/AppStore';
import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import styled from 'styled-components';
import reloadPage from '../../http/reloadPage';
import DialogHeader from '../dialog/DialogHeader';

const ErrorDialogContainer = styled( Dialog )`
    .desc-text {
        margin-bottom: 0.4rem;
    }
    
    .error-message, .error-name {
        padding: 0.4rem;
    }
    
    .error-name {
        margin-left: 0.4rem;
    }
    
    .error-id-container {
        margin-top: 1rem;
    }
    
    .message-container {
        margin-top: 1rem;
    }
`;

const ErrorDialog = () => {
    const appError = useSelector<AppStore, Error>( store => store.error.error );

    if ( !appError ) {
        return null;
    }

    return (
        <ErrorDialogContainer fullWidth maxWidth="xs" keepMounted={ false } open={ !!appError }>
            <DialogHeader icon={ <Error color="error"/> }>
                Error occured!
            </DialogHeader>
            <DialogContent dividers>
                <div>
                    <Typography className="desc-text">
                        Error description:
                    </Typography>
                    <code className="code error-message">
                        { appError.message }
                    </code>
                </div>
                <Grid alignItems="center" className="error-id-container" container>
                    <Typography>
                        Error ID:
                    </Typography>
                    <code className="code error-name">
                        { appError.name }
                    </code>
                </Grid>
                <div className="message-container">
                    <Typography variant="body1">
                        Reloading page usually solves the issue, however if the error still appears please send feedback
                        to me with the given error description and ID.
                    </Typography>
                    <Typography>
                        Thank you!
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary">
                    Send feedback
                </Button>
                <Button className="reload-btn" onClick={ reloadPage } variant="contained" color="primary">
                    Reload page
                </Button>
            </DialogActions>
        </ErrorDialogContainer>
    );
};

export default ErrorDialog;
