import ResetPasswordDto from '../../../../src/modules/auth/dto/ResetPasswordDto';

export default interface PasswordResetDialogProps
{
    isOpen?: boolean;
    onClose: () => any;
    defaultValues?: ResetPasswordDto;
}
