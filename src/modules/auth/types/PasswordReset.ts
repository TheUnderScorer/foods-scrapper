import UserDocument from '../../users/types/UserDocument';

export default interface PasswordReset
{
    token: string;
    user?: UserDocument;
}
