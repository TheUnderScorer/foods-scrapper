import UserInterface from './modules/users/types/User';

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
