import RequestPasswordResetDto from '../../../../src/modules/auth/dto/RequestPasswordResetDto';

export default interface PasswordResetDialogProps
{
    isOpen?: boolean;
    onClose: () => any;
    defaultValues?: RequestPasswordResetDto;
    onSubmit?: ( result: boolean ) => any;
}
