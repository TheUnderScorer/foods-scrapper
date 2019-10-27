import FormikStatus from '../../../types/formik/FormikStatus';

export default interface PasswordResetStatus extends FormikStatus
{
    isPasswordResetRequestCreatedError?: boolean;
}
