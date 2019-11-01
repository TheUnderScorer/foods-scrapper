import * as React from 'react';
import { FC } from 'react';
import RegisterSuccessDialogProps from './types/RegisterSuccessDialogProps';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import DialogHeader from '../dialog/DialogHeader';
import { Check } from '@material-ui/icons';
import styled from 'styled-components';
import { green } from '@material-ui/core/colors';

const CheckIcon = styled( Check )`
    color: ${ green.A400 }
`;

// TODO Tests
const RegisterSuccessDialog: FC<RegisterSuccessDialogProps> = ( { visible } ) =>
{
    return (
        <Dialog fullWidth maxWidth="xs" open={ visible }>
            <DialogHeader icon={ <CheckIcon/> }>
                You have registered!
            </DialogHeader>
            <DialogContent>
                Thank you for you registration.
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" href="/">
                    Search for foods
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegisterSuccessDialog;
