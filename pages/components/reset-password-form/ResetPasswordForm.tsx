import * as React from 'react';
import { FC } from 'react';
import ResetPasswordFormProps from './types/ResetPasswordFormProps';
import { withFormik } from 'formik';
import PasswordResetDto from '../../../src/modules/auth/dto/PasswordResetDto';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape<PasswordResetDto>( {
    password: Yup.string().min( 7, 'Password should contain at least 7 characters.' ).required( 'Provide your new password.' ),
    token:    Yup.string().required( 'Provide reset password token.' ),
} );

const ResetPasswordForm: FC<ResetPasswordFormProps> = () =>
{
    return null;
};

const formikWrapper = withFormik<ResetPasswordFormProps, PasswordResetDto>( {
    mapPropsToValues: ( { defaults } ) => defaults,
    handleSubmit:     async ( values ) =>
                      {

                      },
    validationSchema,
} );

export default formikWrapper( ResetPasswordForm );
