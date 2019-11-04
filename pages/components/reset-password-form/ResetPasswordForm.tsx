import * as React from 'react';
import { FC } from 'react';
import ResetPasswordFormProps from './types/ResetPasswordFormProps';
import { FormikProps, withFormik } from 'formik';
import PasswordResetDto from '../../../src/modules/auth/dto/PasswordResetDto';
import * as Yup from 'yup';
import { CardForm } from '../card-page/styled';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import Notice from '../notice/Notice';
import FormikStatus from '../../types/formik/FormikStatus';
import { getInputError } from '../../formik/errors';
import { isEmpty } from 'lodash';
import buildHttpHandler from '../../formik/buildHttpHandler';
import ResponseResult from '../../../src/types/ResponseResult';
import ResetPasswordResult from '../../../src/modules/auth/password-reset-service/types/ResetPasswordResult';
import client from '../../http/client';
import { Routes } from '../../http/types/Routes';

const validationSchema = Yup.object().shape<PasswordResetDto>( {
    password: Yup.string().min( 7, 'Password should contain at least 7 characters.' ).required( 'Provide your new password.' ),
    token: Yup.string().required( 'Provide reset password token.' ),
} );

const ResetPasswordForm: FC<FormikProps<PasswordResetDto> & ResetPasswordFormProps> = ( props ) =>
{
    const { isSubmitting, values, handleSubmit, handleBlur, handleChange, errors, touched } = props;

    const status = props.status as FormikStatus | undefined;
    const inputError = getInputError<PasswordResetDto>( touched, errors );

    return (
        <CardForm action="#" onSubmit={ handleSubmit }>
            <Grid justify="center" container>
                { status && status.error &&
                <Notice item xs={ 10 } type="error">
                    { status.message }
                </Notice>
                }
                { status && status.result &&
                <Notice item xs={ 10 } type="success">
                    { status.message }
                </Notice>
                }
                <Grid item xs={ 10 }>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={ values.password }
                        onBlur={ handleBlur }
                        helperText={ inputError( 'password' ) ? inputError( 'password' ) : 'Enter your new password' }
                        error={ !!inputError( 'password' ) }
                        onChange={ handleChange }
                        name="password"
                        label="Password"
                        type="password"
                    />
                </Grid>
                <Grid className="form-item button-container" item xs={ 10 }>
                    <Button variant="contained" className="submit-button"
                            disabled={ !isEmpty( errors ) || isSubmitting } type="submit" color="primary">
                        { isSubmitting ?
                            <>
                                <CircularProgress size={ 30 }/>
                                <span className="loader-label">
                                    Submitting...
                                </span>
                            </> :
                            'Submit' }
                    </Button>
                </Grid>
            </Grid>
        </CardForm>
    );
};

const formikWrapper = withFormik<ResetPasswordFormProps, PasswordResetDto>( {
    mapPropsToValues: ( { defaults } ) => defaults,
    handleSubmit: async ( values, { setStatus, resetForm, setSubmitting } ) =>
    {
        const httpHandler = buildHttpHandler<ResponseResult<ResetPasswordResult>>( setStatus );
        const { isEmpty } = await httpHandler( () => client.post( Routes.resetPassword, values ) );

        if ( !isEmpty() ) {
            const status: FormikStatus = {
                result: true,
                message: 'Your password have been changed, you can use it now to log in.',
            };

            resetForm();
            setStatus( status );
        }

        setSubmitting( false );
    },
    validationSchema,
} );

export default formikWrapper( ResetPasswordForm );
