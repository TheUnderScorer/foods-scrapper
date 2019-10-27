import * as React from 'react';
import { FC } from 'react';
import PasswordResetDialogProps from './types/PasswordResetDialogProps';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField } from '@material-ui/core';
import { FormikProps, withFormik } from 'formik';
import ResetPasswordDto from '../../../src/modules/auth/dto/ResetPasswordDto';
import * as Yup from 'yup';
import DialogHeader from '../dialog/DialogHeader';
import { getInputError } from '../../formik/errors';
import styled from 'styled-components';

const validationSchema = Yup.object().shape<ResetPasswordDto>( {
    email: Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
} );

const Container = styled( Dialog )`
    .loader-label{
        margin-left: 1rem;
    }
`;

const PasswordResetDialog: FC<FormikProps<ResetPasswordDto> & PasswordResetDialogProps> = ( props ) =>
{
    const { isOpen = false, onClose, handleChange, handleBlur, values, touched, errors, isSubmitting, handleSubmit } = props;

    const getError = getInputError<ResetPasswordDto>( touched, errors );

    return (
        <Container maxWidth="sm" open={ isOpen } onClose={ onClose }>
            <form action="#" onSubmit={ handleSubmit }>
                <DialogHeader>
                    Reset password
                </DialogHeader>
                <DialogContent>
                    <DialogContentText>
                        If you have forgotten your password provide e-mail that you have used to register your account below.
                        We will sent you an e-mail with link that will reset your password.
                    </DialogContentText>
                    <Grid justify="center" container>
                        <Grid item xs={ 12 }>
                            <TextField
                                fullWidth
                                label="E-mail"
                                helperText={ getError( 'email' ) ? getError( 'email' ) : 'E-mail address that you have used in registration.' }
                                error={ !!getError( 'email' ) }
                                name="email"
                                variant="outlined"
                                value={ values.email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onClose }>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        { isSubmitting ?
                            <>
                                <CircularProgress size={ 30 }/>
                                <span className="loader-label">
                                    Submitting...
                                </span>
                            </> :
                            'Submit' }
                    </Button>
                </DialogActions>
            </form>
        </Container>
    );
};

const formikWrapper = withFormik<PasswordResetDialogProps, ResetPasswordDto>( {
    mapPropsToValues: ( { defaultValues } ) => ( {
        email: defaultValues ? defaultValues.email : '',
    } ),
    handleSubmit:     async ( { email }, { setStatus, resetForm, setSubmitting } ) =>
                      {

                      },
    validationSchema,
} );

export default formikWrapper( PasswordResetDialog );
