import RequestPasswordResetDto from '../../../../src/modules/auth/dto/RequestPasswordResetDto';
import FormikStatus from '../../../types/formik/FormikStatus';

export default interface PasswordResetDialogProps
{
    isOpen?: boolean;
    onClose: () => any;
    defaultValues?: RequestPasswordResetDto;
    onSubmit?: ( result: boolean ) => any;
    initialStatus?: FormikStatus;
}
