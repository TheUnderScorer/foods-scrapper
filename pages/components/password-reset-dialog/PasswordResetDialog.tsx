import * as React from 'react';
import { FC } from 'react';
import PasswordResetDialogProps from './types/PasswordResetDialogProps';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField } from '@material-ui/core';
import { FormikProps, withFormik } from 'formik';
import RequestPasswordResetDto from '../../../src/modules/auth/dto/RequestPasswordResetDto';
import * as Yup from 'yup';
import DialogHeader from '../dialog/DialogHeader';
import { getInputError } from '../../formik/errors';
import styled from 'styled-components';
import buildHttpHandler from '../../formik/buildHttpHandler';
import ResponseResult from '../../../src/types/ResponseResult';
import client from '../../http/client';
import { Routes } from '../../http/types/Routes';
import Notice from '../notice/Notice';
import getDefaultStatus from '../../formik/getDefaultStatus';
import { ErrorCodes } from '../../../src/enums/ErrorCodes';
import PasswordResetStatus from './types/PasswordResetStatus';

const validationSchema = Yup.object().shape<RequestPasswordResetDto>( {
    email: Yup.string().required( 'Provide e-mail address.' ).email( 'Invalid e-mail provided.' ),
} );

const Container = styled( Dialog )`
    .loader-label{
        margin-left: 1rem;
    }
`;

const PasswordResetDialog: FC<FormikProps<RequestPasswordResetDto> & PasswordResetDialogProps> = ( props ) =>
{
    const { isOpen = false, onClose, handleChange, handleBlur, values, touched, errors, isSubmitting, handleSubmit, setSubmitting } = props;
    const status = props.status as PasswordResetStatus;

    const getError = getInputError<RequestPasswordResetDto>( touched, errors );

    return (
        <Container keepMounted={ false } maxWidth="sm" open={ isOpen } onClose={ onClose }>
            <form action="#" onSubmit={ handleSubmit }>
                <DialogHeader>
                    Reset password
                </DialogHeader>
                <DialogContent>
                    <DialogContentText>
                        If you have forgotten your password provide e-mail that you have used to register your account below.
                        We will sent you an e-mail with link that will reset your password.
                    </DialogContentText>
                    { status && status.result &&
                      <Notice className="success-notice" type="success">
                          { status.message }
                      </Notice>
                    }
                    { status && status.error &&
                      <Notice className="error-notice" type="error">
                          { status.message }

                          { status.isPasswordResetRequestCreatedError &&
                            <>
                                { ' ' }
                                <a href="#">
                                    Re-send e-mail with link?
                                </a>
                            </>
                          }
                      </Notice>
                    }
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
                    <Button disabled={ isSubmitting } onClick={ onClose }>
                        Cancel
                    </Button>
                    <Button disabled={ isSubmitting } type="submit" variant="contained" color="primary">
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

const formikWrapper = withFormik<PasswordResetDialogProps, RequestPasswordResetDto>( {
    mapPropsToValues: ( { defaultValues } ) => ( {
        email: defaultValues ? defaultValues.email : '',
    } ),
    handleSubmit:     async ( values, { setStatus, resetForm, setSubmitting, props } ) =>
                      {
                          setStatus( getDefaultStatus() );

                          const httpHandler = buildHttpHandler<ResponseResult<boolean>>( setStatus );
                          const { isEmpty, response } = await httpHandler( () => client.post( Routes.requestPasswordReset, values ) );
                          const { data } = response;

                          if ( !isEmpty() ) {

                              if ( props.onSubmit ) {
                                  props.onSubmit( data.result );
                              }

                              const status: PasswordResetStatus = {
                                  result:  true,
                                  message: 'We have sent you an e-mail with password reset link.',
                              };

                              resetForm();

                              setStatus( status );
                          } else {
                              if ( data.error === ErrorCodes.PasswordResetRequestCreated ) {
                                  const status: PasswordResetStatus = {
                                      error:                              true,
                                      message:                            data.message,
                                      isPasswordResetRequestCreatedError: true,
                                  };

                                  setStatus( status );
                              }
                          }

                          setSubmitting( false );
                      },
    validationSchema,
} );

export default formikWrapper( PasswordResetDialog );
