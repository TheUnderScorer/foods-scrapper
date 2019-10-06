import User from '../../users/interfaces/user.interface';
import LoginResult from './login-result.interface';

export default interface RegisterResult extends LoginResult
{
    user: User;
}
