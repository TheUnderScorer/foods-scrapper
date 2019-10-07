import { FormikErrors, FormikTouched } from 'formik';

export const hasInputError = <Input extends object>( touched: FormikTouched<Input>, errors: FormikErrors<Input>, name: keyof Input ) => Boolean( touched[ name ] && errors[ name ] );

export const getInputError = <Input extends object>
( touched: FormikTouched<Input>, errors: FormikErrors<Input> ) => ( name: keyof Input ) => hasInputError( touched, errors, name ) ? errors[ name ] : '';

