import User from '../../users/types/User';
import LoginResult from './LoginResult';

export default interface RegisterResult extends LoginResult
{
    user: User;
}
