import UserState from '../../reducers/interfaces/UserState';
import ErrorState from '../../reducers/types/ErrorState';

export default interface AppStore
{
    user: UserState;
    error: ErrorState
}
