import User from '../../users/interfaces/user.interface';

export default interface RegisterResult
{
    user: User;
    jwt: string;
}
