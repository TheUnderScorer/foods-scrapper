import UserInterface from './modules/users/interfaces/user.interface';

declare global
{
    namespace Express
    {
        interface Request
        {
            user: UserInterface;
        }
    }
}
