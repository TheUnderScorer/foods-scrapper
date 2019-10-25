import * as React from 'react';
import { FC } from 'react';
import RegisterSuccessDialogProps from './interfaces/register-success-dialog-props.interface';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const RegisterSuccessDialog: FC<RegisterSuccessDialogProps> = ( { visible } ) =>
{
    return (
        <Dialog open={ visible }>
            <DialogTitle>
                You have registered!
            </DialogTitle>
            <DialogContent>
                Thank you for you registration.
            </DialogContent>
            <DialogActions>
                <Button href="/">
                    Search for foods
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterSuccessDialog;
