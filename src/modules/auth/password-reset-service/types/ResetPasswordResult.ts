import UserDocument from '../../../users/types/UserDocument';

export default interface ResetPasswordResult
{
    user: UserDocument;
    password: string;
}
