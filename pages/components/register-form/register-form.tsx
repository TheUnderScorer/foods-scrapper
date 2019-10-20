import * as React from 'react';
import { FC } from 'react';
import { FormikProps, withFormik } from 'formik';
import RegisterFormProps from './interfaces/register-form-props.interface';
import RegisterInput from './interfaces/register-input.interface';

const RegisterForm: FC<FormikProps<RegisterInput> & RegisterInput> = () =>
{
    return (
        <div>
            Register component
        </div>
    );
};

const formikWrapper = withFormik<RegisterFormProps, RegisterInput>( {
    mapPropsToValues: () => ( {
        password: '',
        email:    '',
    } ),
    handleSubmit:     async ( { email, password }, { setSubmitting, setError } ) =>
                      {

                      },
} );

export default formikWrapper( RegisterForm );
